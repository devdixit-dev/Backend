import mongoose from "mongoose";

const post_schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: { type: Date, default: Date.now },
  content: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }]
});

const Post = mongoose.model('posts', post_schema);

export default Post;