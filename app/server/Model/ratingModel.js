const db = require('../DB/db');

const Rating = {
  
  async getMaxRatingId() {
    const [[maxRating]] = await db.query(
      'SELECT MAX(RatingId) AS maxId FROM used_car.Rating'
    );
    return maxRating.maxId;
  },
  
  async createRating(RatingId, RatingData) {
    //console.log('ratingModelRatingId');
    //console.log(RatingId)
    //console.log('ratingModelRatingData');
    //console.log(RatingData)
    const [result] = await db.query(
      `INSERT INTO used_car.Rating 
       (RatingId,CarTitle, Price, OverallRating, ExteriorRating, InteriorRating, RideQuality)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        RatingId,
        RatingData.ratings.CarTitle,
        RatingData.ratings.Price,   
        RatingData.ratings.OverallRating,    
        RatingData.ratings.ExteriorRating,
        RatingData.ratings.InteriorRating,
        RatingData.ratings.RideQuality
        
      ]
    );
    return result;
  },
};

module.exports = Rating;