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


// controllers/carController.js
exports.getCarById = (req, res) => {
  try {
    const carId = parseInt(req.params.id);
    const car = cars.find(c => c.CarId === carId);
    
    if (car) {
      // 渲染模板并传递格式化后的数据
      res.render('carDetail', { 
        car
        
      });
    } else {
      res.status(404).render('error', { message: 'Car not found' });
      console.log('cannot found')
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).render('error', { message: 'Server error' });
    console.log('Server error')
  }
};

