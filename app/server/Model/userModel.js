// models/userModel.js
const db = require('../DB/db');

// 查全部使用者（debug 用）
exports.getAll = async () => {
  const [rows] = await db.query('SELECT * FROM User');
  return rows;
};

// 建立新使用者
exports.createUser = async (user) => {
  const {
    name,
    email,
    password,
    isSeller,
    birthDate,
    locations,
    phone
  } = user;

  const [result] = await db.query(
    `INSERT INTO User (Name, Email, Password, IsSeller, BirthDate, Locations, Phone)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, email, password, isSeller, birthDate, locations, phone]
  );

  return result.insertId;
};
