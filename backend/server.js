const express = require('express');
const cors = require('cors');
const path = require('path'); 

// 根据环境加载对应的.env文件
require('dotenv').config({
  path: path.join(__dirname, process.env.NODE_ENV === 'production' 
    ? '.env.production' 
    : '.env.development')
});const connectDB = require('./config/db');
console.log('Current Environment:', process.env.NODE_ENV);
console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Defined' : 'Undefined');
console.log('Loaded ENV File:', process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development');

const app = express();

// CORS 配置
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://comptia-frontend.vercel.app',
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true // 如果需要携带 cookies
}));

// 解析 JSON 请求体
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
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 处理 404 错误
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

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

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
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