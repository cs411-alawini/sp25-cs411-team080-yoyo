const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const db = require('../DB/db');

console.log('✅ userRoute.js loaded');

// 处理 POST /user（支持注册和登录）
router.post('/', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received request:', { 
      source: formData.source, 
      name: formData.Name, 
      password: '***REDACTED***' 
    });

    // 登录逻辑
    if (formData.source === 'login') {
      // 1. 查询数据库验证用户
      const [users] = await db.query(
        `SELECT UserId, Name FROM used_car.User 
         WHERE Name = ? AND Password = ?`,
        [formData.Name, formData.Password]
      );

      // 2. 检查是否找到匹配用户
      if (users.length > 0) {
        const user = users[0];
        return res.json({
          success: true,
          message: 'Login successful',
          data: {
            UserId: user.UserId,
            Name: user.Name
          }
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'Invalid username or password'
        });
      }
    }

    // 注册逻辑（原有代码）
    if (formData.source === 'register') {
      const [[maxUser]] = await db.query(
        'SELECT MAX(UserId) AS maxId FROM used_car.User'
      );
      const newUserId = maxUser.maxId ? maxUser.maxId + 1 : 1;

      const insertData = {
        UserId: newUserId,
        IsSeller: formData.isSeller || false,
        Name: formData.name,
        Email: formData.email,
        BirthDate: formData.BirthDate || null,
        Password: formData.password,
        Locations: formData.location || null,
        Phone: formData.phone
      };

      const [result] = await db.query(
        `INSERT INTO used_car.User 
         (UserId, IsSeller, Name, Email, BirthDate, Password, Locations, Phone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          insertData.UserId,
          insertData.IsSeller,
          insertData.Name,
          insertData.Email,
          insertData.BirthDate,
          insertData.Password,
          insertData.Locations,
          insertData.Phone
        ]
      );

      return res.json({
        success: true,
        message: 'User created successfully',
        data: {
          UserId: newUserId,
          affectedRows: result.affectedRows
        }
      });
    }

    // 未知的source类型
    return res.status(400).json({
      success: false,
      error: 'Invalid source type',
      validSources: ['register', 'login']
    });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// 原有路由保持不变
router.post('/register', userController.register);
router.get('/ping', (req, res) => {
  console.log('✅ /ping was hit');
  res.json({ message: 'pong!' });
});
router.get('/all', async (req, res) => { /* ...原有代码... */ });

module.exports = router;