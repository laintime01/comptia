const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const authController = require('../controllers/authController');

// 检查控制器方法是否存在
console.log('Available controller methods:', Object.keys(authController));

// 1. 用户注册
router.post('/register', [
  body('username')
    .isLength({ min: 3 })
    .trim()
    .withMessage('Username must be at least 3 characters long')
    .matches(/^[A-Za-z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers and underscore'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
], authController.register);

// 2. 用户登录 - 简化版本
router.post('/login', authController.login);

// 暂时注释掉其他路由，直到实现相应的控制器方法
/*
// 3. 发送密码重置邮件
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail()
], authController.forgotPassword);

// 4. 重置密码
router.post('/reset-password', [
  body('newPassword')
    .isLength({ min: 6 })
    .matches(/\d/)
    .matches(/[A-Z]/),
  body('resetToken').not().isEmpty()
], authController.resetPassword);

// 5. 修改密码
router.post('/change-password', auth, [
  body('currentPassword').not().isEmpty(),
  body('newPassword')
    .isLength({ min: 6 })
    .matches(/\d/)
    .matches(/[A-Z]/)
], authController.changePassword);

// 6. 验证token
router.get('/verify-token', auth, authController.verifyToken);

// 7. 注销
router.post('/logout', auth, authController.logout);
*/

module.exports = router;