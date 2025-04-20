import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

// GET
export const getDashboard = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate("posts")
  res.render('dashboard', { user })
}

// create new post
export const createNewPost = async (req, res) => {

  const {content} = req.body;

  const user = req.user
  let post = await Post.create({
    user: user._id,
    content,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect('/user/dashboard');

}

// like the post
export const userLike = async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id });


  if(post.likes.indexOf(req.user._id) === -1){
    post.likes.push(req.user._id);
  }
  else{
    post.likes.indexOf(req.user._id)
  }

  await post.save();

  res.redirect('/user/dashboard', {post})
}

// POST
export const SignUp = async (req, res) => {

  const {name, email, password} = req.body;

  const user = await User.findOne({ email });

  if(user){
    console.log({ success: false, message: 'User already exist' })
    res.redirect('/login')
  }

  const decodePassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password: decodePassword })
  console.log({ success: true, message: 'User registered successfully' })
  res.redirect('/login')

};

export const Login = async (req, res) => {

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

  const genID = nanoid(12);
  await User.updateOne(
    { email: user.email }, 
    { $set: { activeSessionId: genID } }
  )

  res.status(200)
  .cookie('token', encodeURIComponent(user._id), {
    httpOnly: true, 
    secure: true,
    sameSite: true,
    maxAge: 20 * 60 * 1000 // 20min
  })
  .cookie('activeSessionId', genID, {
    httpOnly: true, 
    secure: true,
    sameSite: true,
    maxAge: 20 * 60 * 1000 // 20min
  })
  console.log({ success: true, message: "Log in successfully" })
  res.redirect('/user/dashboard')
};

export const Logout = async (req, res) => {

  const token = req.cookies.token;

  if(!token) {
    console.log('Unauthorized login detected')
    res.redirect('/user/login')
  }

  await User.updateOne(
    { _id: token }, 
    { $set: { activeSessionId: null } }
  )

  res.clearCookie('activeSessionId', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });

  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true
  });

  res.redirect('/login')
};