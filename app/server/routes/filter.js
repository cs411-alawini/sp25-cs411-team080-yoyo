// app/server/routes/filter.js
const express = require('express');
const router = express.Router();
const db = require('../DB/db');

router.get('/', (req, res) => {
  res.render('FilterPage');
});

router.post('/results', async (req, res) => {
  const { make, model, minPrice, maxPrice, minYear, maxYear, bodyType, fuelType, transmissionType } = req.body;

  let query = "SELECT * FROM Car WHERE 1=1";
  let params = [];

  if (make) {
    query += " AND Make LIKE ?";
    params.push(`%${make}%`);
  }
  if (model) {
    query += " AND Model LIKE ?";
    params.push(`%${model}%`);
  }
  if (minPrice) {
    query += " AND CarPrice >= ?";
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND CarPrice <= ?";
    params.push(maxPrice);
  }
  if (minYear) {
    query += " AND ManufactureYear >= ?";
    params.push(minYear);
  }
  if (maxYear) {
    query += " AND ManufactureYear <= ?";
    params.push(maxYear);
  }
  if (bodyType) {
    query += " AND BodyType LIKE ?";
    params.push(`%${bodyType}%`);
  }
  if (fuelType) {
    query += " AND FuelType LIKE ?";
    params.push(`%${fuelType}%`);
  }
  if (transmissionType) {
    query += " AND TransmissionType LIKE ?";
    params.push(`%${transmissionType}%`);
  }

  try {
    const [results] = await db.query(query, params);
    res.render('FilterResults', { results });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

module.exports = router;
