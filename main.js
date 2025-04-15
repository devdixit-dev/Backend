import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

const user_schema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 6 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 }
});

const User = mongoose.model('users', user_schema);

const ConnectDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/', {dbName: 'auth-db'})
  .then(() => { console.log('Connected to database') })
  .catch((e) => { console.log(`Error connecting to database ${e}`) });
}
ConnectDatabase();

// home route
app.get('/', (req, res) => {
  res.send('Home page or / page');
});

// user authentication
app.post('/user/signup', async (req, res) => {

  const {name, email, password} = req.body;

  const user = await User.findOne({ email });

  if(user){
    return res.json({
      success: false,
      message: "User already exist"
    });
  }

  const decodePassword = bcrypt.hash(password, 10);

  await User.create({ name, email, password: decodePassword })
  return res.json({
    success: true,
    message: "User registered"
  });

});

app.post('/user/login', async (req, res) => {

  const {email, password} = req.body;

  const user = await User.findOne({ email });

  if(!user){
    return res.json({
      success: false,
      message: "User not found. Register first"
    })
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if(!verifyPassword) {
    return res.json({
      success: false,
      message: "Invalid email or password"
    })
  }

  const genID = await nanoid(8);
  console.log(genID);

  res.cookie('token', user._id, {
    httpOnly: true, 
    secure: true,
    sameSite: true,
    maxAge: 15 * 60 * 1000 // 15min
  })
  .json({
    success: true,
    message: "Log in successfully"
  })
});

app.post('/user/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });
  return res.json({
    success: false,
    message: "User logged out"
  })
})

app.listen(port, () => { console.log(`Server is running on port ${port}`) });