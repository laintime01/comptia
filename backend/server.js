// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
connectDB();

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/questions', require('./routes/questions'));

// 健康检查路由
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({ 
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;

// 启动服务器
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// 只有在不是测试环境时才启动服务器
if (process.env.NODE_ENV !== 'test') {
  startServer();
}

// 处理未捕获的异常
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // 在生产环境可能需要优雅地关闭服务器
  if (process.env.NODE_ENV === 'production') {
    console.log('Shutting down server due to unhandled promise rejection');
    process.exit(1);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  process.exit(0);
});

module.exports = app;