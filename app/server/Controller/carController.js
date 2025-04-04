// controllers/carController.js
const carModel = require('../Model/carModel');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await carModel.getAllCars();
    res.json(cars);
  } catch (err) {
    console.error('Read Car Data Fail:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};