import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();

const app = express();
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
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
