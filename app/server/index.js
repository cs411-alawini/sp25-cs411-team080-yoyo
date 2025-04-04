const express = require('express');
const userRoutes = require('./routes/userRoute');
const carRoutes = require('./routes/carRoute');
const path = require('path');

const app = express()//create a express application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Views'));

app.use('/user', userRoutes);
app.use('/car', carRoutes);

app.get('/', (req, res) => {
    res.render('MainPage');
  });

app.get('/login', (req, res)=>{
    res.render('Login')
})

app.listen(3000, ()=>{
    console.log('listen on port 3000')
})