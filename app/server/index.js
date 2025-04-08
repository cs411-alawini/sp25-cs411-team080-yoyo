const express = require('express');
const userRoutes = require('./routes/userRoute'); 
const carRoutes = require('./routes/carRoute');
const carController = require('./Controller/carController');
const path = require('path');

const app = express();

// 中间件
app.use(express.json()); // 解析 JSON 请求体（必须！否则前端无法发送 JSON）
app.use(express.urlencoded({ extended: true }));

// 静态文件和视图
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './Views'));

// 路由挂载
console.log('✅ userRoutes is loaded');
app.use('/user', userRoutes); 
app.use('/car', carRoutes);



// 页面路由
app.get('/', (req, res) => res.render('MainPage'));
app.get('/login', (req, res) => res.render('Login'));
app.get('/register', (req, res) => res.render('Register'));

// 启动服务器
app.listen(3000, () => console.log('Server running on port 3000'));