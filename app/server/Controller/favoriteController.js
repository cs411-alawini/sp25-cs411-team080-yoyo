const db = require('../DB/db');
const favoriteModel = require('../Model/favoriteModel');

exports.addFavorite = async (req, res) => {
  const userId = req.session.user?.id;
  const carId = req.params.carId;

  if (!userId) return res.status(403).send('Login required');

  const conn = await db.getConnection();
  try {
    await conn.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    await conn.beginTransaction();

    await conn.query(
      'INSERT IGNORE INTO Favorite (UserId, CarId) VALUES (?, ?)',
      [userId, carId]
    );

    await conn.query(
      'INSERT INTO ActivityLog (UserId, Action) VALUES (?, ?)',
      [userId, `Favorited car ID ${carId}`]
    );

    await conn.commit();
    res.redirect('/car/' + carId);
  } catch (err) {
    console.error('Add favorite failed (transaction rolled back):', err);
    await conn.rollback();
    res.status(500).send('Favorite error');
  } finally {
    conn.release();
  }
};

exports.getFavoritesByUser = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  try {
    const favorites = await favoriteModel.getFavoritesByUserId(user.id);
    res.render('UserDashBoard', {
      user,
      car: [],
      ads: [],
      favorites
    });
  } catch (err) {
    console.error('Fetch favorites failed:', err);
    res.status(500).send('Error loading favorites');
  }
};

exports.getUserFavorites = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.redirect('/login');

  const conn = await db.getConnection(); // 1. getConnection()

  try {
    await conn.beginTransaction(); // 2. begin transaction

    const cars = await favoriteModel.getFavoritesByUserId(user.id);

    const [activities] = await conn.query(`
      SELECT a.Timestamp, c.CarTitle
      FROM ActivityLog a
      JOIN Car c ON CAST(SUBSTRING_INDEX(a.Action, 'ID ', -1) AS UNSIGNED) = c.CarId
      WHERE a.UserId = ?
        AND a.Action LIKE 'Favorited car ID%'
      ORDER BY a.Timestamp DESC
      LIMIT 5
    `, [user.id]);

    await conn.commit(); // 3. commit transaction

    res.render('favorite', { cars, activities });
  } catch (err) {
    await conn.rollback(); // 4. rollback if any error
    console.error('Failed to fetch favorites or activities:', err);
    res.status(500).send('Server error');
  } finally {
    conn.release(); // 5. always release connection
  }
};

exports.removeFavorite = async (req, res) => {
    const userId = req.session.user.id;
    const carId = req.params.carId;
  
    try {
      await favoriteModel.removeFavorite(userId, carId);
      res.redirect('/favorite');
    } catch (err) {
      console.error('Remove favorite failed:', err);
      res.status(500).send('Remove favorite error');
    }
  };
  