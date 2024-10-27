// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 检查环境变量是否存在
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // 连接数据库
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // 设置默认数据库
    mongoose.connection.db = mongoose.connection.useDb('comptia');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Database: ${mongoose.connection.db.databaseName}`);

    // 监听数据库连接事件
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // 处理应用关闭时的数据库连接
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;