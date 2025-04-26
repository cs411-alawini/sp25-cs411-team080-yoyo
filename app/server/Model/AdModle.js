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
  },

  findById: async (advertisementId) => {
    const query = `
      SELECT * FROM Advertisement
      WHERE AdvertisementId = ?
    `;
    const [rows] = await db.query(query, [advertisementId]);
    return rows[0]; // return the first matching row
  },

  updateById: (id, data) => {
    const query = `
      UPDATE Advertisement
      SET CarAttentionGrabber = ?, FinanceAvailable = ?, Discounted = ?
      WHERE AdvertisementId = ?
    `;
    return db.query(query, [
      data.CarAttentionGrabber,
      data.FinanceAvailable,
      data.Discounted,
      id
    ]);
  },

  deleteById : async (id) => {
    const query = `DELETE FROM Advertisement WHERE AdvertisementId = ?`;
    return db.query(query, [id]);
  }
};

module.exports = Advertisement;
