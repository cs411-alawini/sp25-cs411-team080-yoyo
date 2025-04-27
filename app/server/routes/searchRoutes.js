// routes/searchRoutes.js
const express = require('express');
const router = express.Router();
const searchController = require('../Controller/searchController');

router.post('/', searchController.storeSearch);

module.exports = router;
