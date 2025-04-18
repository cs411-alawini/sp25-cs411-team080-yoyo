const express = require('express');
const userRoutes = require('./routes/userRoute'); 
const carRoutes = require('./routes/carRoute');
const adRoutes = require('./routes/AdRoute');
const path = require('path');
const session = require('express-session');

const app = express(); // create an express application

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(session({
  secret : "thisismysecret",
  resave : false,
  saveUninitialized : false,
  cookie : {
      expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge : 1000 * 60 * 60 * 24 * 7,
      httpOnly : true
  }
}))

app.use((req, res, next) => {
  console.log('Current session:', req.session);
  next();
});

app.set('view engine', 'ejs');
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, './Views'));

app.use('/user', userRoutes); 
app.use('/car', carRoutes);
app.use('/advertisement', adRoutes);

app.get('/', (req, res) => {
  res.render('MainPage'); 
});

app.get('/session', (req, res) => {
  if (req.session && req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user  
    });
  } else {
    res.json({ loggedIn: false });
  }
});


app.get('/login', (req, res) => {
  res.render('Login'); 
});

app.listen(3000, ()=>{
    console.log('listen on port 3000')
})

