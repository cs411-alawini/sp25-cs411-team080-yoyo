const User = require('../Model/userModel');

exports.register = async (req, res) => {
  console.log('register API hit ✅');

  const user = req.body;
  console.log('received:', user);

  // 必要欄位檢查
  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const userId = await User.createUser(user);
    res.status(201).json({ message: 'User registered', userId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Registration failed' });
  }
};