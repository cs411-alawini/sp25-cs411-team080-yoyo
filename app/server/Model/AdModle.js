const db = require('../DB/db');

const Advertisement = {
  create: async (adData) => {
    const query = `
      INSERT INTO Advertisement (
        CarId, UserId, CarAttentionGrabber, FinanceAvailable, Discounted
      ) VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      adData.CarId,
      adData.UserId,
      adData.CarAttentionGrabber,
      adData.FinanceAvailable,
      adData.Discounted
    ];
    return db.query(query, values);
  },

  getByUserId: async (userId) => {
    const query = `
      SELECT * FROM Advertisement WHERE UserId = ?
    `;
    return db.query(query, [userId]);
  }
};

module.exports = Advertisement;
