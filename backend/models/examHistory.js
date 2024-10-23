// models/examHistory.js
const mongoose = require('mongoose');

const examHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examType: {
    type: String,
    enum: ['A+', 'Network+', 'Security+'],
    required: true
  },
  mode: {
    type: String,
    enum: ['practice', 'simulation', 'domain-focus', 'objective-focus'],
    default: 'practice'
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed  // 可以存储多种答案类型（单选、多选、拖拽等）
  },
  results: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    correct: Boolean,
    userAnswer: mongoose.Schema.Types.Mixed,
    timeSpent: Number,
    domain: String,
    objective: String
  }],
  domainScores: {
    type: Map,
    of: {
      score: Number,
      total: Number,
      correct: Number
    }
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  passingScore: {
    type: Number,
    default: 70  // CompTIA通常要求70%或以上
  },
  startTime: Date,
  endTime: Date,
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

examHistorySchema.methods.generateReport = function() {
  const report = {
    score: this.score,
    passed: this.score >= this.passingScore,
    domainPerformance: Object.fromEntries(this.domainScores),
    timeSpent: this.endTime - this.startTime,
    weakDomains: [],
    recommendations: []
  };

  // 分析薄弱领域
  for (const [domain, stats] of this.domainScores) {
    if (stats.score < 70) {
      report.weakDomains.push({
        domain,
        score: stats.score
      });
    }
  }

  return report;
};

const ExamHistory = mongoose.model('ExamHistory', examHistorySchema);

module.exports = ExamHistory;