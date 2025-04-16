const db = require('../DB/db');

exports.getAllCars = async () => {
  const [rows] = await db.query('SELECT * FROM Car');
  return rows;
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