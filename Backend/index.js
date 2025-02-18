import express from "express";
import { configDotenv } from "dotenv";
import connectToDb from "./configs/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//Routers
import userRouter from "./routes/user-route.js";
import authMiddleware from "./middlewares/auth.middleware.js";

configDotenv();
connectToDb();

const app = express();
app.use(cookieParser());
app.use(express.json());
const { DEV_ORIGIN, PROD_ORIGIN_1, PROD_ORIGIN_2, PROD_ORIGIN_3 } = process.env;
const allowedOrigins = [
  DEV_ORIGIN,
  PROD_ORIGIN_1,
  PROD_ORIGIN_2,
  PROD_ORIGIN_3,
];

// Allow requests from frontend
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // making it "include" wont work!
  })
);

//endpoints
app.use("/", userRouter);

app.get("/",(req, res) => {
  res.status(200).json({ message: "Hello World" });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
