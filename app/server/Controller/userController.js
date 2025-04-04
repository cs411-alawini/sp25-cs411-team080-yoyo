const userModel = require('../Model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAll(); // 呼叫 Model 拿資料
    res.json(users); // 回傳給前端
  } catch (err) {
    res.status(500).json({ error: '伺服器錯誤' });
  }
};