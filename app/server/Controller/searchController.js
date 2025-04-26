const searchModel = require('../Model/searchModel');

async function storeSearch(req, res) {
  const user = req.session.user;
  const { make, model } = req.body;

  if (!user) {
    return res.status(401).json({ success: false, redirect: '/login' });
  }

  const userId = user.id

  try {
    await searchModel.storeSearch(userId, make, model);
    
    res.json({ success: true });
  } catch (err) {
    console.error('Error storing search:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  }
}

module.exports = {
  storeSearch
};