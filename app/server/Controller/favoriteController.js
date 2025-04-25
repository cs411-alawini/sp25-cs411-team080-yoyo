const favoriteModel = require('../Model/favoriteModel');

exports.addFavorite = async (req, res) => {
  const userId = req.session.user?.id;
  const carId = req.params.carId;

  if (!userId) return res.status(403).send('Login required');

  try {
    await favoriteModel.addToFavorite(userId, carId);
    res.redirect('/car/' + carId);
  } catch (err) {
    console.error('Add favorite failed:', err);
    res.status(500).send('Favorite error');
  }
};

exports.getFavoritesByUser = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  try {
    const favorites = await favoriteModel.getFavoritesByUserId(user.id);
    res.render('UserDashBoard', {
      user,
      car: [],
      ads: [],
      favorites
    });
  } catch (err) {
    console.error('Fetch favorites failed:', err);
    res.status(500).send('Error loading favorites');
  }
};

exports.getUserFavorites = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  try {
    const cars = await favoriteModel.getFavoritesByUserId(user.id);
    res.render('favorite', { cars });
  } catch (err) {
    console.error('Failed to fetch favorites:', err);
    res.status(500).send('Server error');
  }
};

exports.removeFavorite = async (req, res) => {
    const userId = req.session.user.id;
    const carId = req.params.carId;
  
    try {
      await favoriteModel.removeFavorite(userId, carId);
      res.redirect('/favorite');
    } catch (err) {
      console.error('Remove favorite failed:', err);
      res.status(500).send('Remove favorite error');
    }
  };
  