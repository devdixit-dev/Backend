import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
  profilePic: { type: String, default: 'default.png' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }]
}, {timestamps: true});

const User = mongoose.model('users', user_schema);

export default User;