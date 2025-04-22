import express from 'express';
import { createNewPost, editPost, getDashboard, Login, Logout, SignUp, updatePost, userLike } from '../controllers/userController.js';
import RestrictToLoggedInUserOnly from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp)

userRouter.post('/login', Login)

userRouter.get('/dashboard', RestrictToLoggedInUserOnly, getDashboard);

userRouter.post('/post', RestrictToLoggedInUserOnly, createNewPost);

userRouter.get('/like/:id', RestrictToLoggedInUserOnly, userLike);

userRouter.get('/edit/:id', RestrictToLoggedInUserOnly, editPost);

userRouter.post('/update/:id', RestrictToLoggedInUserOnly, updatePost);

userRouter.post('/logout', RestrictToLoggedInUserOnly, Logout);

export default userRouter;