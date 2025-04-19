import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  activeSessionId: { type: String, default: 0, unique: true }
}, {timestamps: true});

const User = mongoose.model('users', user_schema);

export default User;