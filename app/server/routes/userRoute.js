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

router.get('/profile', userController.profilePage);

router.get('/userInfo', userController.userProfile);

router.get('/:id', userController.getSingleUser);

router.post('/:id', userController.updateUser);

module.exports = router;