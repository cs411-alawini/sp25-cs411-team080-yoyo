const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.get('/register',(req,res)=>{
  res.render('Register')
})

router.get('/login',(req, res)=>{
  res.render("Login")
})

// POST /user/login
router.post('/login', userController.loginUser);

// POST /user/register
router.post('/register', userController.registerUser);

//Logout
router.get('/logout',userController.logoutUser);

router.get('/profile', (req,res)=>{
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('UserDashBoard', { user: req.session.user });
})

module.exports = router;