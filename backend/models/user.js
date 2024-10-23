// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot exceed 20 characters'],
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscore']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'suspended', 'inactive'],
    default: 'active'
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: String,
    timezone: String,
  },
  preferences: {
    examDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard', 'mixed'],
      default: 'mixed'
    },
    questionsPerExam: {
      type: Number,
      default: 10,
      min: 5,
      max: 100
    },
    preferredCategories: [{
      type: String,
      enum: ['Network+', 'Security+', 'A+']
    }]
  },
  stats: {
    totalExams: {
      type: Number,
      default: 0
    },
    totalQuestions: {
      type: Number,
      default: 0
    },
    averageScore: {
      type: Number,
      default: 0
    },
    bestScore: {
      type: Number,
      default: 0
    },
    examHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ExamHistory'
    }],
    categoryScores: {
      'Network+': { type: Number, default: 0 },
      'Security+': { type: Number, default: 0 },
      'A+': { type: Number, default: 0 }
    }
  },
  lastLogin: {
    timestamp: Date,
    ipAddress: String,
    userAgent: String
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// 在保存之前加密密码
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 验证密码的方法
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 更新用户统计信息的方法
userSchema.methods.updateStats = async function(examScore, category) {
  this.stats.totalExams += 1;
  this.stats.totalQuestions += this.preferences.questionsPerExam;
  
  // 更新平均分
  this.stats.averageScore = (
    (this.stats.averageScore * (this.stats.totalExams - 1) + examScore) / 
    this.stats.totalExams
  );
  
  // 更新最高分
  if (examScore > this.stats.bestScore) {
    this.stats.bestScore = examScore;
  }
  
  // 更新类别分数
  if (category) {
    this.stats.categoryScores[category] = examScore;
  }
  
  await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;