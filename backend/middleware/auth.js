// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// 认证中间件
const auth = async (req, res, next) => {
  // 开发阶段：自动放行并设置默认用户
  if (process.env.NODE_ENV === 'development') {
    // 设置一个默认用户信息用于开发
    req.user = {
      userId: 'dev-user-id',
      role: 'admin'  // 开发时默认设为管理员方便测试所有功能
    };
    return next();
  }

  // 生产环境的认证逻辑（后期启用）
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No authentication token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// 管理员权限中间件
const isAdmin = async (req, res, next) => {
  // 开发阶段：自动放行
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  // 生产环境的权限检查（后期启用）
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin privileges required' });
  }
  next();
};

module.exports = { auth, isAdmin };