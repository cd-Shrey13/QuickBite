import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const cookie = req.headers.cookie;
  const token = cookie.startsWith("token=") ? cookie.slice(6) : cookie;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token not found",
    });
  }

  // const parts = cookie.split(" ");
  // if (parts.length === 2 && parts[0] === "Bearer") {
  //   token = parts[1];
  // }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // return res.status(200).json({
    //   success: true,
    //   message: "authorised successfully!",
    // });
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default authMiddleware;
