// routes/questions.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const Question = require('../models/question');
const ExamHistory = require('../models/examHistory');

// 1. 获取题目列表（支持分页和过滤）
router.get('/', auth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      difficulty,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { explanation: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(query)
      .select(req.user.role === 'admin' ? '+correctAnswer' : '-correctAnswer')
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('createdBy', 'username');

    const total = await Question.countDocuments(query);

    res.json({
      questions,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. 随机抽题（支持条件筛选）
router.get('/random', auth, async (req, res) => {
  try {
    const { category, difficulty, count = 10 } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: parseInt(count) } },
      { 
        $project: {
          question: 1,
          options: 1,
          category: 1,
          difficulty: 1,
          // 不返回正确答案
          correctAnswer: req.user.role === 'admin' ? 1 : 0
        }
      }
    ]);

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 3. 管理员添加新题目
router.post('/', [auth, isAdmin], [
  body('question').notEmpty(),
  body('options').isArray({ min: 4, max: 4 }),
  body('correctAnswer').isInt({ min: 0, max: 3 }),
  body('category').isIn(['Network+', 'Security+', 'A+']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('explanation').notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const question = new Question({
      ...req.body,
      createdBy: req.user.userId
    });

    await question.save();
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: 'Invalid question data', error: error.message });
  }
});

// 4. 管理员批量导入题目
router.post('/batch', [auth, isAdmin], async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'No questions provided' });
    }

    // 给所有题目添加创建者信息
    const processedQuestions = questions.map(q => ({
      ...q,
      createdBy: req.user.userId
    }));

    const result = await Question.insertMany(processedQuestions, {
      ordered: false // 继续处理即使有些文档插入失败
    });

    res.status(201).json({
      message: 'Questions imported successfully',
      count: result.length
    });
  } catch (error) {
    res.status(400).json({ message: 'Import failed', error: error.message });
  }
});

// 5. 开始模拟考试
router.post('/exam/start', auth, async (req, res) => {
  try {
    const { category, questionCount = 10 } = req.body;
    
    // 随机抽取题目
    const questions = await Question.aggregate([
      { $match: category ? { category } : {} },
      { $sample: { size: parseInt(questionCount) } },
      {
        $project: {
          question: 1,
          options: 1,
          category: 1,
          difficulty: 1
        }
      }
    ]);

    // 创建考试记录
    const exam = new ExamHistory({
      userId: req.user.userId,
      questions: questions.map(q => q._id),
      totalQuestions: questions.length,
      startTime: new Date   
    
    });

    await exam.save();

    res.json({
      examId: exam._id,
      questions: questions.map(q => ({
        ...q,
        _id: q._id // 保留题目ID用于提交答案
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 6. 提交考试答案
router.post('/exam/:examId/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body; // { questionId: selectedAnswer }
    const exam = await ExamHistory.findOne({
      _id: req.params.examId,
      userId: req.user.userId,
      completed: false
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found or already completed' });
    }

    // 获取所有题目的正确答案
    const questions = await Question.find({
      _id: { $in: Object.keys(answers) }
    }).select('correctAnswer explanation');

    // 计算分数
    let correctCount = 0;
    const detailedResults = [];

    questions.forEach(question => {
      const isCorrect = answers[question._id] === question.correctAnswer;
      if (isCorrect) correctCount++;

      detailedResults.push({
        questionId: question._id,
        correct: isCorrect,
        userAnswer: answers[question._id],
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    });

    // 更新考试记录
    exam.completed = true;
    exam.endTime = new Date();
    exam.score = (correctCount / questions.length) * 100;
    exam.answers = answers;
    exam.results = detailedResults;

    await exam.save();

    res.json({
      score: exam.score,
      correctCount,
      totalQuestions: questions.length,
      detailedResults
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 7. 获取考试历史详情
router.get('/exam/:examId', auth, async (req, res) => {
  try {
    const exam = await ExamHistory.findOne({
      _id: req.params.examId,
      userId: req.user.userId
    }).populate('questions', 'question options category difficulty');

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.json(exam);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 8. 获取个人考试统计
router.get('/statistics/personal', auth, async (req, res) => {
  try {
    const { timeRange = 'all' } = req.query;
    let dateQuery = {};

    // 设置时间范围
    if (timeRange !== 'all') {
      const now = new Date();
      const ranges = {
        'week': new Date(now - 7 * 24 * 60 * 60 * 1000),
        'month': new Date(now - 30 * 24 * 60 * 60 * 1000),
        'year': new Date(now - 365 * 24 * 60 * 60 * 1000)
      };
      dateQuery = { startTime: { $gte: ranges[timeRange] } };
    }

    // 查询考试历史
    const examHistory = await ExamHistory.find({
      userId: req.user.userId,
      completed: true,
      ...dateQuery
    });

    // 计算统计数据
    const statistics = {
      totalExams: examHistory.length,
      averageScore: 0,
      highestScore: 0,
      byCategory: {},
      byDifficulty: {},
      recentScores: []
    };

    examHistory.forEach(exam => {
      // 更新平均分和最高分
      statistics.averageScore += exam.score;
      statistics.highestScore = Math.max(statistics.highestScore, exam.score);

      // 按类别统计
      exam.questions.forEach(q => {
        if (!statistics.byCategory[q.category]) {
          statistics.byCategory[q.category] = {
            totalQuestions: 0,
            correctAnswers: 0
          };
        }
        statistics.byCategory[q.category].totalQuestions++;
        if (exam.results.find(r => r.questionId.equals(q._id)).correct) {
          statistics.byCategory[q.category].correctAnswers++;
        }
      });

      // 添加到最近成绩
      statistics.recentScores.push({
        date: exam.endTime,
        score: exam.score
      });
    });

    // 计算最终的平均分
    if (statistics.totalExams > 0) {
      statistics.averageScore /= statistics.totalExams;
    }

    // 计算每个类别的正确率
    Object.keys(statistics.byCategory).forEach(category => {
      const categoryStats = statistics.byCategory[category];
      categoryStats.accuracyRate = (categoryStats.correctAnswers / categoryStats.totalQuestions) * 100;
    });

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 9. 管理员获取题目统计
router.get('/statistics/admin', [auth, isAdmin], async (req, res) => {
  try {
    const statistics = {
      totalQuestions: await Question.countDocuments(),
      byCategory: {},
      byDifficulty: {},
      recentlyAdded: await Question.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('createdBy', 'username'),
      mostMissed: [] // 将通过聚合查询填充
    };

    // 按类别统计
    const categoryStats = await Question.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    categoryStats.forEach(stat => {
      statistics.byCategory[stat._id] = stat.count;
    });

    // 按难度统计
    const difficultyStats = await Question.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);
    difficultyStats.forEach(stat => {
      statistics.byDifficulty[stat._id] = stat.count;
    });

    // 查找错误率最高的题目
    const examResults = await ExamHistory.aggregate([
      { $unwind: '$results' },
      {
        $group: {
          _id: '$results.questionId',
          totalAttempts: { $sum: 1 },
          incorrectAttempts: {
            $sum: { $cond: ['$results.correct', 0, 1] }
          }
        }
      },
      {
        $project: {
          errorRate: {
            $multiply: [
              { $divide: ['$incorrectAttempts', '$totalAttempts'] },
              100
            ]
          },
          totalAttempts: 1
        }
      },
      { $sort: { errorRate: -1 } },
      { $limit: 5 }
    ]);

    // 获取错误率最高题目的详细信息
    const questionIds = examResults.map(r => r._id);
    const questionDetails = await Question.find({
      _id: { $in: questionIds }
    }).select('question category difficulty');

    statistics.mostMissed = examResults.map(result => ({
      ...questionDetails.find(q => q._id.equals(result._id))?.toObject(),
      errorRate: result.errorRate,
      totalAttempts: result.totalAttempts
    }));

    res.json(statistics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 10. 验证单个题目答案（练习模式）
router.post('/:id/verify', auth, async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await Question.findById(req.params.id)
      .select('correctAnswer explanation');

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const isCorrect = answer === question.correctAnswer;

    res.json({
      correct: isCorrect,
      explanation: question.explanation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;