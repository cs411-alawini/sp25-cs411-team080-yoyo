const Advertisement = require('../Model/AdModle');
const carModel = require('../Model/carModel')

exports.checkAdOwnership = async (req, res, next) => {
  const adId = req.params.id;
  const currentUser = req.session.user;

  if (!currentUser) {
    return res.status(401).send('Unauthorized. Please log in.');
  }

  try {
    const ad = await Advertisement.findById(adId);

    if (!ad) {
      return res.status(404).send('Advertisement not found');
    }
    console.log()
    if (ad.UserId !== currentUser.id) {
      req.session.alertMessage = '⚠️ You are not allowed to modify this advertisement.';
      return res.redirect('/user/profile')
    }
    req.ad = ad;
    next();
  } catch (err) {
    console.error('Ownership check failed:', err);
    res.status(500).send('Server error');
  }
};

exports.createAdvertisement = async (req, res) => {
  const user = req.session.user;
  try {
    const carId = req.params.id;
    const {
      carAttentionGrabber,
      financeAvailable,
      discounted
    } = req.body;

    await Advertisement.create({
      CarId: carId,
      UserId: user.id,
      CarAttentionGrabber: carAttentionGrabber,
      FinanceAvailable: !!financeAvailable,
      Discounted: !!discounted
    });
    res.redirect('/user/profile')
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
};

exports.getAdvertisementById = async (req, res) => {
  const id = req.params.id;
  try {
    const ad = await Advertisement.findById(id);
    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }
    res.json(ad);
  } catch (err) {
    console.error('Error fetching advertisement:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAdById = async (req, res) => {
  const id = req.params.id;

  const { CarAttentionGrabber, FinanceAvailable, Discounted } = req.body;

  try {
    await Advertisement.updateById(id, {
      CarAttentionGrabber,
      FinanceAvailable: FinanceAvailable === 'true',
      Discounted: Discounted === 'true'
    });
    res.redirect('/user/profile')
  } catch (err) {
    console.error('Error updating ad:', err);
    res.status(500).send('Server error');
  }
};

exports.deleteAdById = async (req, res) => {
  const id = req.params.id;

  try {
    await Advertisement.deleteById(id);
    res.redirect('/user/profile')
  } catch (err) {
    console.error('Error deleting ad:', err);
    res.status(500).send('Server error');
  }
};
