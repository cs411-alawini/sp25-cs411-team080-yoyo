const express = require('express');
const router = express.Router();
const ratingController = require('../Controller/ratingController');
router.post('/', ratingController.register_rating);
module.exports = router;