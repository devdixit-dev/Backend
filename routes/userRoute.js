import express from 'express';
import { createNewPost, editPost, getDashboard, getProfile, Login, Logout, SignUp, updateInfo, updatePost, userLike } from '../controllers/userController.js';
import RestrictToLoggedInUserOnly from '../middlewares/auth.js';
import upload from '../utills/multer.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp);

userRouter.post('/login', Login);

userRouter.get('/dashboard', RestrictToLoggedInUserOnly, getDashboard);

userRouter.post('/post', RestrictToLoggedInUserOnly, createNewPost);

userRouter.get('/like/:id', RestrictToLoggedInUserOnly, userLike);

userRouter.get('/edit/:id', RestrictToLoggedInUserOnly, editPost);

userRouter.post('/update/:id', RestrictToLoggedInUserOnly, updatePost);

userRouter.get('/profile', RestrictToLoggedInUserOnly, getProfile);

userRouter.post('/update', upload.single('avatar'), RestrictToLoggedInUserOnly, updateInfo);

userRouter.post('/logout', RestrictToLoggedInUserOnly, Logout);

export default userRouter;