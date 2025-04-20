const express = require('express');
const router = express.Router();
const carController = require('../Controller/carController');

router.get('/', carController.getAllCars);

router.post('/', carController.handleCarForm);

/*
router.get('/', (req, res) => {
    const carId = parseInt(req.query.id); // 从查询参数获取 id
    
    if (!carId) {
      return res.status(400).send('Car ID is required');
    }
  
    const car = carController.getCarById(carId);
    if (car) {
      res.render('carDetail', { car });
    } else {
      res.status(404).send('Car not found!');
    }
  });

*/
router.get('/:id', carController.getCarById);

module.exports = router;