const express = require('express');
const router = express.Router();
const favoriteController = require('../Controller/favoriteController');

// Add to favorites
router.post('/add/:carId', favoriteController.addFavorite);

// View favorites
router.get('/', favoriteController.getUserFavorites);

// Remove from favorites (optional)
router.post('/remove/:carId', favoriteController.removeFavorite);

module.exports = router;
