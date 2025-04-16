import express from 'express';
import cookieParser from 'cookie-parser';

import ConnectDatabase from './config/db.js'
import userRouter from './routes/userRoute.js';


const app = express();
const port = 3000;

ConnectDatabase();

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter)

// home route
app.get('/', (req, res) => {
  res.send('Home page or / page');
});

app.listen(port, () => { console.log(`Server is running on port ${port}`) });