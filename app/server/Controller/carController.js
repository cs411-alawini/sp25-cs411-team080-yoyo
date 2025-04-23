// controllers/carController.js
const carModel = require('../Model/carModel');
cars=[];
exports.getAllCars = async (req, res) => {
  try {
    cars = await carModel.getAllCars();
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

// ✅ 3. Render the carDetail page and trend chart
exports.getCarById = async (req, res) => {
  try {
    const carId = parseInt(req.params.id);
    
    const car = await carModel.getCarById(carId);
    if (!car) {
      return res.status(404).render('error', { message: 'Car not found' });
    }

    const trend = await carModel.getPriceTrendByModel(car.Make, car.Model); // 🆕 Trend by Make

    res.render('carDetail', {
      car,
      trend
    });
  } catch (err) {
    console.error('Error fetching car detail:', err);
    res.status(500).render('error', { message: 'Server error' });
    console.log('Server error')
  }
};
