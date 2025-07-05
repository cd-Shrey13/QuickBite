import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

// Load environment variables from the default .env file
configDotenv();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;


  if (!token) {
    return res.status(403).json({
      success: false,
      msg: "Access denied!",
    });
  }

  try {
    const decryptedUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decryptedUserData;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg: "Invalid token!",
    });
  }
};

export default authMiddleware;
