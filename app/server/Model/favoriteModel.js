const db = require('../DB/db');

exports.addToFavorite = async (userId, carId) => {
  await db.query(
    'INSERT IGNORE INTO Favorite (UserId, CarId) VALUES (?, ?)',
    [userId, carId]
  );
};

exports.getFavoritesByUserId = async (userId) => {
  const [rows] = await db.query(`
    SELECT c.*, 
           (SELECT COUNT(*) FROM Favorite f2 WHERE f2.CarId = c.CarId) AS FavoriteCount
    FROM Car c
    INNER JOIN Favorite f ON c.CarId = f.CarId
    WHERE f.UserId = ?
  `, [userId]);
  return rows;
};

exports.removeFavorite = async (userId, carId) => {
    await db.query('DELETE FROM Favorite WHERE userId = ? AND carId = ?', [userId, carId]);
  };
  
