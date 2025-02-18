import express from "express";
import { configDotenv } from "dotenv";
import signinController from "../controllers/signinController.js";
import signupController from "../controllers/signupController.js";
configDotenv();
const userRouter = express.Router();

//Path to signup a new user
userRouter.post(process.env.SIGN_UP_USER, signupController);
//Path tp signin an already registered user
userRouter.post(process.env.SIGN_IN_USER, signinController);

export default userRouter;
