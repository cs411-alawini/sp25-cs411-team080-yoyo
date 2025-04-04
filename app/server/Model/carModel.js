const db = require('../DB/db');

exports.getAllCars = async () => {
  const [rows] = await db.query('SELECT * FROM Car');
  return rows;
};