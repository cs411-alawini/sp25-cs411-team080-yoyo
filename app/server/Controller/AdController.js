const Advertisement = require('../Model/AdModle');
const carModel = require('../Model/carModel')

exports.createAdvertisement = async (req, res) => {
  try {
    const carId = req.params.id;
    const user = req.session.user;


    const {
      carAttentionGrabber,
      financeAvailable,
      discounted
    } = req.body;

    if (!user) return res.redirect('/login');

    await Advertisement.create({
      CarId: carId,
      UserId: user.id,
      CarAttentionGrabber: carAttentionGrabber,
      FinanceAvailable: !!financeAvailable,
      Discounted: !!discounted
    });

    const car = await carModel.getCarsByUserId(user.id);
    const [ads] = await Advertisement.getByUserId(user.id);
    res.render('UserDashBoard', {
          user,
          car,
          ads
    });
  } catch (err) {
    console.error('Error creating advertisement:', err);
    res.status(500).send('Failed to create advertisement.');
  }
};

exports.getAdsByUserId = async (req, res)=>{
  const userId = req.params.userId;

  try {
    const [ads] = await Advertisement.getByUserId(userId);

    if (ads.length === 0) {
      return res.status(404).json({ message: 'No advertisements found for this user.' });
    }

    res.status(200).json(ads);
  } catch (error) {
    console.error('Error fetching ads by user ID:', error);
    res.status(500).json({ message: 'Server error while fetching advertisements.' });
  }
}
