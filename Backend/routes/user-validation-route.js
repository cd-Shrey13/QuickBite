import jwt from "jsonwebtoken";
import express from "express";
import { configDotenv } from "dotenv";

// Load environment variables from the default .env file
configDotenv();

const userValidatioRouter = express.Router();

const validateUser = (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Not logged in" });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ id: user.id, email: user.email });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

userValidatioRouter.get("/me", validateUser);

export default userValidatioRouter;
