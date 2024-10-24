const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  try {
    const { username, email, password, profile } = req.body;

    // 检查用户名是否已存在
    let existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // 检查邮箱是否已存在
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // 创建新用户
    const user = new User({
      username,
      email,
      password, // 密码会通过 mongoose pre save 中间件自动加密
      profile: {
        firstName: profile?.firstName || '',
        lastName: profile?.lastName || ''
      },
      // 设置默认值
      preferences: {
        examDifficulty: 'mixed',
        questionsPerExam: 10,
        preferredCategories: []
      },
      stats: {
        totalExams: 0,
        totalQuestions: 0,
        averageScore: 0,
        bestScore: 0,
        examHistory: [],
        categoryScores: {
          'Network+': 0,
          'Security+': 0,
          'A+': 0
        }
      },
      lastLogin: {
        timestamp: new Date(),
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    await user.save();

    // 生成 JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 返回成功响应
    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    // 处理 Mongoose 验证错误
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: validationErrors[0] });
    }

    // 处理其他错误
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户 (支持使用用户名或邮箱登录)
    const user = await User.findOne({
      $or: [
        { username: username },
        { email: username }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 检查用户状态
    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Your account is not active. Please contact support.' });
    }

    // 验证密码
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 更新最后登录信息
    user.lastLogin = {
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };
    await user.save();

    // 生成 JWT
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 返回成功响应
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};