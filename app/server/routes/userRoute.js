const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

router.get('/register',(req,res)=>{
  res.render('Register')
})

// POST /user/login
router.post('/login', userController.loginUser);

// POST /user/register
router.post('/register', userController.registerUser);


// 其他路由...
module.exports = router;