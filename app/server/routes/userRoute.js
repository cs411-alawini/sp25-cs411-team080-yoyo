const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const db = require('../DB/db'); // ✅ 新增：引入資料庫模組

console.log('✅ userRoute.js loaded');

// 註冊 API
router.post('/register', userController.register);

// ping 測試
router.get('/ping', (req, res) => {
  console.log('✅ /ping was hit');
  res.json({ message: 'pong!' });
});

// ✅ 新增：GET /all - 顯示所有使用者
router.get('/all', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM User');
      res.json(rows);
    } catch (err) {
      console.error('❌ Error fetching users:', err);  // ✅ 印出完整錯誤
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

module.exports = router;
