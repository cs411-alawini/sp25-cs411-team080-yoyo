const express = require('express');
const router = express.Router();
const carController = require('../Controller/carController');

router.get('/', carController.getAllCars);

module.exports = router;