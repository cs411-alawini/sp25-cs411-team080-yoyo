const userModel = require('../Model/userModel');
const carModel = require('../Model/carModel');
const adModel = require('../Model/AdModle')

const userController = {
  async loginUser(req, res) {
    const { Name, Password } = req.body;

    try {
      const users = await userModel.findUserByNameAndPassword(Name, Password);

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
      const maxUserId = await userModel.getMaxUserId();
      const newUserId = maxUserId ? maxUserId + 1 : 1;

      const result = await userModel.createUser(newUserId, userData);

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

      const users = await userModel.getUserByID(id);

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
     
      if (!user) return res.redirect('/login');

      try {
        const car = await carModel.getCarsByUserId(user.id);
        const [ads] = await adModel.getByUserId(user.id);

        res.render('UserDashBoard', {
          user,
          car,
          ads
        });
      } catch (err) {
        console.error(' Failed to load profile:', err);
        res.status(500).send('Server error');
      }
    },

    async userProfile(req,res){
      const user = req.session.user;

      if (!user) return res.redirect('/login');

      try {
        const userDetail = await userModel.getUserByID(user.id)

        res.render('userinfo', {
          userDetail
        });
      } catch (err) {
        console.error(' Failed to load user Info:', err);
        res.status(500).send('Server error');
      }
    },

    async updateUser(req, res) {
      const { email, phone, location } = req.body;
      const user = req.session.user;
    
      if (!user) return res.redirect('/login');
    
      try {
        await userModel.updateUserInfo(user.id, email, phone, location);
        const car = await carModel.getCarsByUserId(user.id);
        const [ads] = await adModel.getByUserId(user.id);

        res.render('UserDashBoard', {
          user,
          car,
          ads
        });
      } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Server error' });
      }
    }

  };

module.exports = userController;