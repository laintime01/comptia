// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const { auth, isAdmin } = require('../middleware/auth');
const User = require('../models/user');

// 1. 管理员获取所有用户（支持分页和搜索）
router.get('/', [auth, isAdmin], async (req, res) => {
  try {
    const { page = 1, limit = 10, search, role } = req.query;
    const skip = (page - 1) * limit;

    // 构建查询条件
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    if (role) {
      query.role = role;
    }

    // 获取用户列表和总数
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. 管理员查看单个用户详情
router.get('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('lastLogin', 'loginTime ipAddress');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 3. 管理员更新用户信息
router.put('/:id', [auth, isAdmin], [
  body('username').optional().isLength({ min: 3 }),
  body('email').optional().isEmail(),
  body('role').optional().isIn(['user', 'admin']),
  body('status').optional().isIn(['active', 'suspended', 'inactive'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, role, status } = req.body;
    const updateData = {};

    // 只更新提供的字段
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 4. 管理员删除用户
router.delete('/:id', [auth, isAdmin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 防止删除最后一个管理员
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last admin' });
      }
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 5. 获取当前用户信息
router.get('/me/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password')
      .populate('examHistory', 'examDate score totalQuestions');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 6. 更新当前用户信息
router.put('/me/profile', auth, [
  body('username').optional().isLength({ min: 3 }),
  body('email').optional().isEmail(),
  body('currentPassword').optional(),
  body('newPassword').optional().isLength({ min: 6 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user.userId);
    const { username, email, currentPassword, newPassword } = req.body;

    // 如果要更新密码，先验证当前密码
    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();
    res.json({
      message: 'Profile updated successfully',
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 7. 获取用户考试历史
router.get('/me/exam-history', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const examHistory = await ExamHistory.find({ userId: req.user.userId })
      .sort({ examDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('questions', 'question category');

    const total = await ExamHistory.countDocuments({ userId: req.user.userId });

    res.json({
      examHistory,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 8. 管理员批量操作用户
router.post('/batch', [auth, isAdmin], async (req, res) => {
  try {
    const { action, userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'No users selected' });
    }

    switch (action) {
      case 'delete':
        // 检查是否包含最后一个管理员
        const adminCount = await User.countDocuments({ 
          role: 'admin',
          _id: { $nin: userIds }
        });
        if (adminCount === 0) {
          return res.status(400).json({ message: 'Cannot delete all admins' });
        }
        await User.deleteMany({ _id: { $in: userIds } });
        break;

      case 'suspend':
        await User.updateMany(
          { _id: { $in: userIds } },
          { status: 'suspended' }
        );
        break;

      case 'activate':
        await User.updateMany(
          { _id: { $in: userIds } },
          { status: 'active' }
        );
        break;

      default:
        return res.status(400).json({ message: 'Invalid action' });
    }

    res.json({ message: 'Batch operation completed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;