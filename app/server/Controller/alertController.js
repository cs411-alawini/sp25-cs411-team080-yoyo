const alertModel = require('../Model/alertModel');

async function getAlertAmount(req, res) {
  try {
    const userId = req.session.user.id;
    const alerts = await alertModel.getAlertamount(userId);
    
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).send('Server error');
  }
}

async function getAlertDetail(req, res) {
  try {
    const userId = req.session.user.id;
    const alerts = await alertModel.getPendingAlertsByUser(userId);

    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).send('Server error');
  }
}

module.exports = {
  getAlertAmount,
  getAlertDetail,
};