const express = require('express');
const router = express.Router();
const carController = require('../Controller/carController');

router.get('/', carController.getAllCars);

router.post('/', carController.handleCarForm);

router.get('/:id', carController.getCarById);

module.exports = router;