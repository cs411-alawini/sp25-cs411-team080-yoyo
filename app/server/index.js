const express = require('express');
const userRoutes = require('./routes/userRoute');
const carRoutes = require('./routes/carRoute');
const carController = require('./Controller/carController');
const path = require('path');

const app = express()//create a express application
app.set('view engine', 'ejs');
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));
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

