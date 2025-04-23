const db = require('../DB/db');

async function getAlertamount(userId) {
  const [alerts] = await db.query(`
    SELECT a.AlertId
    FROM Alert a
    JOIN SavedSearch s ON a.SearchId = s.SearchId
    WHERE s.UserId = ? AND a.IsNotified = false
  `, [userId]);

  if (alerts.length > 0) {
    const ids = alerts.map(a => a.AlertId);
    await db.query(`UPDATE Alert SET IsNotified = true WHERE AlertId IN (?)`, [ids]);
  }
  return alerts;
}

async function getPendingAlertsByUser(userId) {
  const [alerts] = await db.query(`
    SELECT a.AlertId, c.Make, c.Model, c.CarTitle, c.CarPrice, c.CarId
    FROM Alert a
    JOIN SavedSearch s ON a.SearchId = s.SearchId
    JOIN Car c ON a.CarId = c.CarId
    WHERE s.UserId = ?
  `, [userId]);
  return alerts;
}



module.exports = {
  getAlertamount,
  getPendingAlertsByUser
};