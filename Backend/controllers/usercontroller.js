import UserModel from "../Models/user.model.js";
import bcrypt from "bcrypt";

import { configDotenv } from "dotenv";
import generateToken from "../helper/tokenGenerator.js";
import { comparePassword } from "../helper/passwordHelper.js";
import {
  successResponseWithToken,
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../helper/responses.js";

//configure dotenv
configDotenv();

export async function signUpUser(req, res) {
  const { firstname, email, password } = req.body;
  try {
    //check if user already exixts
    const userExits = await UserModel.findOne({ email: email });

    //if user exists, return error
    if (userExits) {
      return errorResponse(res, "User already exists", null);
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
    return errorResponse(res, err.message, null);
  }

  //send response
  return successResponse(res, "User signed up successfully");
}

export async function signInUser(req, res) {
  const { email, password } = req.body;
  try {
    //check if user already exists
    const userExists = await UserModel.findOne({ email: email });
    if (!userExists) {
      return notFoundResponse(res, "User does not exist", null);
    }

    //compare password
    const isPasswordValid = await comparePassword(
      password,
      userExists.password
    );
    if (!isPasswordValid) {
      return errorResponse(res, "Invalid password", null);
    }
    //generate token
    const token = generateToken({
      email: userExists.email,
      password: userExists.password,
      id: userExists._id,
    });

    //send response
    return successResponseWithToken(
      res,
      "User signed in successfully",
      userExists,
      token
    );
  } catch (err) {
    //handle error
    return errorResponse(res, err.message, null);
  }
}
