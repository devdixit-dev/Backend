import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path'
import { fileURLToPath } from 'url';

import ConnectDatabase from './config/db.js'
import userRouter from './routes/userRoute.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

ConnectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'images')));
app.use(cookieParser());

app.use('/user', userRouter)

// home route
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/signup', (req, res) => {
  res.render('signup')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/user/dashboard', (req, res) => {
  res.render('dashboard')
});

app.listen(port, () => { console.log(`Server is running on port ${port}`) });