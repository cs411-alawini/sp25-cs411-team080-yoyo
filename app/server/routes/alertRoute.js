const express = require('express');
const router = express.Router();
const alertController = require('../Controller/alertController');

router.get('/', alertController.getAlertAmount);
router.get('/all',alertController.getAlertDetail);

module.exports = router;
