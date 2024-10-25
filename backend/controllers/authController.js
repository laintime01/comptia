const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
      console.log('\n======== 注册流程开始 ========');
      console.log('1. 接收到注册请求');
      console.log('用户名:', req.body.username);
      console.log('邮箱:', req.body.email);
      console.log('原始密码长度:', req.body.password?.length);
  
      const { username, password, email } = req.body;
      
      // 检查用户是否存在
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      
      if (existingUser) {
        console.log('用户已存在:', existingUser.username);
        return res.status(400).json({ 
          message: existingUser.username === username ? 'Username already exists' : 'Email already registered' 
        });
      }
  
      // 密码加密 - 只在这里进行一次
      console.log('\n2. 密码加密');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log('加密后的密码长度:', hashedPassword.length);
  
      // 创建并保存用户
      const user = new User({
        username,
        email,
        password: hashedPassword // 使用加密后的密码
      });
  
      await user.save();
      console.log('3. 用户创建成功');
      console.log('存储的密码哈希:', user.password);
  
      // 验证测试
      console.log('\n4. 验证测试');
      const testVerify = await bcrypt.compare(password, user.password);
      console.log('验证测试结果:', testVerify);
  
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      console.log('======== 注册流程完成 ========\n');
  
      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('注册错误:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  };

exports.login = async (req, res) => {
  try {
    console.log('\n======== 登录流程开始 ========');
    console.log('1. 接收到登录请求');
    console.log('用户名:', req.body.username);
    console.log('输入密码长度:', req.body.password?.length);

    const { username, password } = req.body;

    // 查找用户
    console.log('\n2. 查找用户');
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('用户不存在:', username);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('找到用户:', {
      username: user.username,
      storedHash: user.password
    });

    // 密码验证
    console.log('\n3. 验证密码');
    console.log('存储的密码哈希:', user.password);
    console.log('输入的密码长度:', password.length);

    // 直接使用 bcrypt.compare 进行验证
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('密码验证结果:', isValidPassword ? '正确' : '错误');

    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 生成 token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('======== 登录流程完成 ========\n');

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};