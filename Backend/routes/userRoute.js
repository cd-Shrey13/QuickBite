import express from "express";
import { configDotenv } from "dotenv";
import { signUpUser, signInUser } from "../controllers/usercontroller.js";

const userRouter = express.Router();

//API endpoints
userRouter.post(process.env.SIGN_UP_USER, signUpUser);
userRouter.post(process.env.SIGN_IN_USER, signInUser);
userRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
});


export default userRouter;
