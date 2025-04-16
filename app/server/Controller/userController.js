const User = require('../Model/userModel');
const carModel = require('../Model/carModel');
const axios = require('axios');

const userController = {
  async loginUser(req, res) {
    const { Name, Password } = req.body;

    try {
      const users = await User.findUserByNameAndPassword(Name, Password);

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'Invalid username or password'
        });
      }

      req.session.user = {
        id: users[0].UserId,
        name: users[0].Name
      };

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: users[0]
      });
    } catch (err) {
      console.error('Login Error:', err);
      return res.status(500).json({
        success: false,
        error: 'Server error',
        ...(process.env.NODE_ENV === 'development' && { details: err.stack })
      });
    }
  },

  async registerUser(req, res) {
    const userData = req.body;

    try {
      const maxUserId = await User.getMaxUserId();
      const newUserId = maxUserId ? maxUserId + 1 : 1;

      const result = await User.createUser(newUserId, userData);

      return res.status(200).json({
        success: true,
        message: 'User created successfully',
        data: {
          userId: newUserId,
          affectedRows: result.affectedRows
        }
      });
    } catch (err) {
      console.error('❌ Register Error:', err);
      return res.status(500).json({
        success: false,
        error: 'Server error',
        ...(process.env.NODE_ENV === 'development' && { details: err.stack })
      });
    }
  },

  logoutUser(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.error('Logout Error:', err);
        return res.status(500).json({
          success: false,
          error: 'Logout failed'
        });
      }
  
      // Clear the session cookie on client side
      res.clearCookie('connect.sid'); // make sure this matches your session cookie name
      return res.render('MainPage')
    });
  },

  async getSingleUser(req, res) {
    try {
      const id = req.params.id;

      console.log(req.params)
      const users = await User.getUserByID(id);

      if (users.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(users[0]);
    } catch (error) {
      console.error(' Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },


  async profilePage(req, res) {
      const user = req.session.user;
      console.log(user)
      if (!user) return res.redirect('/login');

      try {
        const cars = await carModel.getCarsByUserId(user.id);
        res.render('UserDashBoard', {
          user,
          cars
        });
      } catch (err) {
        console.error(' Failed to load profile:', err);
        res.status(500).send('Server error');
      }
    }

};

module.exports = userController;