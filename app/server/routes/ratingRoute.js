const express = require('express');
const router = express.Router();
const ratingController = require('../Controller/ratingController');
//router.get('/', ratingController.getAllRatings);
router.get('/:id', ratingController.getRatings); 
router.post('/', ratingController.register_rating);
module.exports = router;