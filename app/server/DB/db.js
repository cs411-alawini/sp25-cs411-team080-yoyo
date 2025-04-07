// ✅ 用 mysql2/promise
const mysql = require('mysql2/promise');
require('dotenv').config(); // 讀取 .env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

console.log('🔐 Using DB user:', process.env.DB_USER);


module.exports = pool;

