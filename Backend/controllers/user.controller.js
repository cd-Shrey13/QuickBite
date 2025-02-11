import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const signUpUser = async (req, res) => {
  const { firstname, email, password } = req.body;
  try {
    //check if user already exixts
    const userExits = await UserModel.findOne({ email: email });

    if (userExits) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = new UserModel({
      firstname,
      email,
      password: hashedPassword,
    });

    //save user to database
    await newUser.save();
  } catch (err) {
    //handle error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(200).json({
    success: true,
    message: "User signed up successfully",
  });
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user already exixts
    const userExists = await UserModel.findOne({ email: email });

    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    //generate token
    const token = jwt.sign(
      { email: userExists.email, id: userExists._id },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      token: token,
      success: true,
      message: "User signed in successfully",
    });
  } catch (err) {
    //handle error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { signInUser, signUpUser };
