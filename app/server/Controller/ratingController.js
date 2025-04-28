const ratingModel = require('../Model/ratingModel');

exports.register_rating=async (req, res) =>{
    const RatingData = req.body;
    
    const currentUser = req.session.user;

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Please login first'
      });
    }

    

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

  exports.getRatings = async (req, res) => {
    const  CarTitle  = req.params.id;
    try {
      ratingsHistory = await ratingModel.getRatings(CarTitle);
      res.json(ratingsHistory);
    } catch (err) {
      console.error('Read Rating Data Fail:', err);
      res.status(500).json({ error: 'Server Error' });
    }
  };
  