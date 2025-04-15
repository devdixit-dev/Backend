import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 3000;

app.use(express.json());

const logs = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
}

app.use(logs());

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
app.get('/', (req, res) => {});

// user authentication
app.post('/user/singup', (req, res) => {});

app.post('/user/login', (req, res) => {});

app.post('/user/logout', (req, res) => {})


app.listen(port, () => { console.log(`Server is running on port ${port}`) });