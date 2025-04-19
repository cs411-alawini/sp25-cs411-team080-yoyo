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

 exports.handleCarForm = async (req, res) => {
  const user = req.session.user;
  
  if (!user) return res.redirect('/login');

  try {
    const carId = await carModel.insertCar(req.body, user.id); 
    console.log("insert car id : " + carId)
    res.redirect('/user/profile');
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).send('Insert error');
  }
}
