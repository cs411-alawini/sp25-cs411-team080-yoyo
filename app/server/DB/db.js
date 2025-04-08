// ✅ 使用 mysql2/promise 创建连接池（硬编码配置版）
const mysql = require('mysql2/promise');

// 直接使我提供的参数配置
const pool = mysql.createPool({
  host: '34.42.114.47',  // 数据库服务器IP
  user: 'root',          // 数据库用户名
  password: '000',       // 数据库密码
  database: 'used_car',  // 数据库名称
  waitForConnections: true, // 连接满时等待
  connectionLimit: 10,   // 连接池最大连接数
  queueLimit: 0          // 无限制的排队请求
});

// 打印当前配置（调试用）
console.log('database connection established:', {
  host: pool.pool.config.host,
  user: pool.pool.config.user,
  database: pool.pool.config.database
});

module.exports = pool;