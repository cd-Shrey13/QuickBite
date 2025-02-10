import express from "express";
import { signInUser, signUpUser } from "../controllers/user.controller.js";
import { configDotenv } from "dotenv";
configDotenv();
const userRouter = express.Router();

//Path to signup a new user
userRouter.post(process.env.SIGN_UP_USER, signUpUser);
//Path tp signin an already registered user
userRouter.post(process.env.SIGN_IN_USER, signInUser);

export default userRouter;
