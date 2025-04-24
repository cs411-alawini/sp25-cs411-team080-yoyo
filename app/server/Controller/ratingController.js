const ratingModel = require('../Model/ratingModel');

exports.register_rating=async (req, res) =>{
    const RatingData = req.body;
    //console.log('ratingController');
    //console.log(RatingData);
    try {
      const maxRatingId = await ratingModel.getMaxRatingId();
      const newRatingId = maxRatingId ? maxRatingId + 1 : 1;
  
      const result = await ratingModel.createRating(newRatingId, RatingData);
  
      return res.status(200).json({
        success: true,
        message: 'Rating submitted successfully',
        
      });
    } catch (err) {
      console.error('Rating Error:', err);
      return res.status(500).json({
        success: false,
        error: 'Server error',
        ...(process.env.NODE_ENV === 'development' && { details: err.stack })
      });
    }
  };
  