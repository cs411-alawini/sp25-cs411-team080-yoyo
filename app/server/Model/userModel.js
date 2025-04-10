const db = require('../DB/db');

const User = {
  async findUserByNameAndPassword(name, password) {
    const [users] = await db.query(
      `SELECT UserId, Name FROM used_car.User 
       WHERE Name = ? AND Password = ?`,
      [name, password]
    );
    return users;
  },

  async getMaxUserId() {
    const [[maxUser]] = await db.query(
      'SELECT MAX(UserId) AS maxId FROM used_car.User'
    );
    return maxUser.maxId;
  },

  async createUser(userId, userData) {
    const [result] = await db.query(
      `INSERT INTO used_car.User 
       (UserId, IsSeller, Name, Email, BirthDate, Password, Locations, Phone)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        userData.isSeller || false,
        userData.name,
        userData.email,
        userData.birthday || null,
        userData.password,
        userData.location || null,
        userData.phone
      ]
    );
    return result;
  }
};

module.exports = User;