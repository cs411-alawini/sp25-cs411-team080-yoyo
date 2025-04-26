const db = require('../DB/db');

exports.getAllCars = async () => {
  const [rows] = await db.query('SELECT * FROM Car');
  return rows;
};

exports.getSale_ByAge_Loc = async (Loc, age_low, age_high) => {
  console.log("PrefModle:",Loc,age_low,age_high)
  try {
    const [rows] = await db.query('CALL GetCarPurchasesByLocationAndAge(?, ?, ?)', [Loc, age_low, age_high]);
    console.log(rows[0])
    return rows[0]; // 存储过程通常返回结果在数组的第一个元素
  } catch (error) {
    console.error('Error in getSale_ByAge_Loc:', error);
    throw error; // 或者返回一个错误对象/默认值
  }
};

exports.insertCar = async (carData, userId) => {

    const {
      Make, Model, CarTitle, CarSubTitle, CarPrice,
      ManufactureYear, BodyType, Mileage, EngineVolume,
      EngineSize, TransmissionType, FuelType, TotalPreviousOwners
    } = carData;
  
    const sql = `
      INSERT INTO Car (
        Make, Model, CarTitle, CarSubTitle, CarPrice,
        ManufactureYear, BodyType, Mileage, EngineVolume,
        EngineSize, TransmissionType, FuelType, TotalPreviousOwners, UserId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      Make, Model, CarTitle, CarSubTitle, CarPrice,
      ManufactureYear, BodyType, Mileage, EngineVolume,
      EngineSize, TransmissionType, FuelType, TotalPreviousOwners, userId
    ];
  
    const [result] = await db.query(sql, values);
    return result.insertId;
}

exports.getCarsByUserId = async(userId) => {
  console.log("cur user" + userId)
  const [cars] = await db.query(
    `SELECT * FROM used_car.Car WHERE UserId = ?`,
    [userId]
  );
  console.log(cars)
  return cars;
};

exports.getCarById = async (carId) => {
  const [rows] = await db.query('SELECT * FROM Car WHERE CarId = ?', [carId]);
  return rows[0]; // Return single car object
};

// Get average price by year for a given model
exports.getPriceTrendByModel = async (makeName, modelName) => {
  const [rows] = await db.query(`
    SELECT ManufactureYear, AVG(CarPrice) AS AvgPrice
    FROM Car
    WHERE Make = ? AND Model = ?
    GROUP BY ManufactureYear
    ORDER BY ManufactureYear
  `, [makeName, modelName]);
  return rows;
};
