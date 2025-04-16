const express = require('express');
const router = express.Router();
const carController = require('../Controller/carController');

router.get('/', carController.getAllCars);

router.post('/', carController.handleCarForm);

module.exports = router;