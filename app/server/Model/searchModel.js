// models/searchModel.js
const db = require('../DB/db');

async function storeSearch(userId, make, model) {
  const createdAt = new Date();
  const [result] = await db.query(`
    INSERT INTO SavedSearch (UserId, Make, Model, CreatedAt)
    VALUES (?, ?, ?, ?)
  `, [userId, make, model, createdAt]);
  console.log([result])
  return result;
}

module.exports = {
  storeSearch
};
