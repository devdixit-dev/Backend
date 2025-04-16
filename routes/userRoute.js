import express from 'express';
import { getDashboard, Login, Logout, SignUp } from '../controllers/userController.js';
import RestrictToLoggedInUserOnly from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/signup', SignUp)

userRouter.post('/login', Login)

userRouter.get('/dashboard', RestrictToLoggedInUserOnly, getDashboard)

userRouter.post('/logout', Logout)

export default userRouter;