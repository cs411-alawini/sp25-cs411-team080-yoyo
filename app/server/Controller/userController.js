const User = require('../Model/userModel');

const userController = {
  async loginUser(req, res) {
    const { Name, Password } = req.body;

    console.log('🔐 Logging in:', Name);

    try {
      const users = await User.findUserByNameAndPassword(Name, Password);

      if (users.length === 0) {
        return res.status(401).json({
          success: false,
          error: 'Invalid username or password'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: users[0]
      });
    } catch (err) {
      console.error('❌ Login Error:', err);
      return res.status(500).json({
        success: false,
        error: 'Server error',
        ...(process.env.NODE_ENV === 'development' && { details: err.stack })
      });
    }
  },

  async registerUser(req, res) {
    const userData = req.body;

    console.log('📝 Registering:', userData);

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
  }
};

module.exports = userController;