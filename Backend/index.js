import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";

import connectDatabase from "./config/db.js";

import foodRouter from "./routes/foodroute.js";
import cartRouter from "./routes/cartroute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import userValidatioRouter from "./routes/user-validation-route.js";

configDotenv(); //Configure environment variables
connectDatabase(); //Connect database

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

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST"], // Allowed HTTP methods
  credentials: true, // Enable cookies or authentication headers
};

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

//API endpoints
app.use(userRouter);
app.use(userValidatioRouter);
app.use("/food", foodRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/images", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
