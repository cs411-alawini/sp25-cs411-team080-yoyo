// models/userModel.js
const db = require('../DB/db');

exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM User');
  return rows;
};

exports.create = async (name, email) => {
  const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
  return result;
};
