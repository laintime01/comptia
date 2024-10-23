// models/question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  // 基本信息
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    minlength: [10, 'Question must be at least 10 characters long']
  },
  options: {
    type: [{
      text: {
        type: String,
        required: true,
        trim: true
      },
      isCorrect: {
        type: Boolean,
        required: true
      }
    }],
    validate: {
      validator: function(options) {
        return options.length >= 2 && // 有些题目可能只有2-3个选项
               options.filter(opt => opt.isCorrect).length === 1; // 只有一个正确答案
      },
      message: 'Questions must have at least 2 options with exactly 1 correct answer'
    }
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required for each question'],
    minlength: [10, 'Explanation must be at least 10 characters long']
  },
  
  // CompTIA 特定字段
  examType: {
    type: String,
    required: true,
    enum: ['A+', 'Network+', 'Security+']
  },
  examDomain: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const domains = {
          'A+': [
            'Mobile Devices',
            'Networking',
            'Hardware',
            'Virtualization and Cloud Computing',
            'Hardware and Network Troubleshooting',
            'Operating Systems'
          ],
          'Network+': [
            'Networking Concepts',
            'Infrastructure',
            'Network Operations',
            'Network Security',
            'Network Troubleshooting and Tools'
          ],
          'Security+': [
            'Attacks, Threats, and Vulnerabilities',
            'Architecture and Design',
            'Implementation',
            'Operations and Incident Response',
            'Governance, Risk, and Compliance'
          ]
        };
        return domains[this.examType]?.includes(v);
      },
      message: 'Invalid exam domain for the selected exam type'
    }
  },
  objective: {
    type: String,
    required: true,
    trim: true
  },
  subObjective: {
    type: String,
    trim: true
  },

  // 题目类型
  questionType: {
    type: String,
    required: true,
    enum: [
      'multiple-choice',      // 单选
      'multiple-response',    // 多选
      'performance-based',    // 实操题
      'drag-and-drop',       // 拖拽题
      'simulation'           // 模拟题
    ]
  },

  // 统计和元数据
  metadata: {
    totalAttempts: {
      type: Number,
      default: 0
    },
    correctAttempts: {
      type: Number,
      default: 0
    },
    reportCount: {
      type: Number,
      default: 0
    },
    lastUsed: Date,
    averageTimeSpent: Number // 秒
  },

  // 参考资料
  references: [{
    title: String,
    url: String,
    section: String // 对应的教材章节或官方文档部分
  }],

  // 管理字段
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'review', 'archived'],
    default: 'active'
  },
  version: {
    type: Number,
    default: 1
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 索引
questionSchema.index({ examType: 1, examDomain: 1 });
questionSchema.index({ objective: 1 });
questionSchema.index({ status: 1 });
questionSchema.index({ 'metadata.totalAttempts': -1 });

// 更新答题统计
questionSchema.methods.updateStats = async function(isCorrect, timeSpent) {
  this.metadata.totalAttempts += 1;
  if (isCorrect) {
    this.metadata.correctAttempts += 1;
  }
  
  // 更新平均用时
  if (timeSpent) {
    this.metadata.averageTimeSpent = this.metadata.averageTimeSpent || 0;
    this.metadata.averageTimeSpent = (
      (this.metadata.averageTimeSpent * (this.metadata.totalAttempts - 1) + timeSpent) /
      this.metadata.totalAttempts
    );
  }
  
  this.metadata.lastUsed = new Date();
  await this.save();
};

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;