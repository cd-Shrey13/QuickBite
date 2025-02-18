import UserModel from "../models/user.model.js";
import generateToken from "../helper/tokenGenerator.js";
import { configDotenv } from "dotenv";
import { comparePassword } from "../helper/passwordHelper.js";
import {
  successResponseWithToken,
  errorResponse,
  notFoundResponse,
} from "../helper/responses.js";

//configure dotenv
configDotenv();

const signinController = async (req, res) => {
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
};

export default signinController;
