import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import { errorResponse, successResponse } from "../helper/responses.js";

//configure dotenv
configDotenv();

const signupController = async (req, res) => {
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
};

export default signupController;
