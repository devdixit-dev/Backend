import mongoose from "mongoose";

const ConnectDatabase = () => {
  mongoose.connect('mongodb://localhost:27017/', {dbName: 'blog-app-backend'})
  .then(() => { console.log('Connected to database') })
  .catch((e) => { console.log(`Error connecting to database ${e}`) });
}

export default ConnectDatabase;