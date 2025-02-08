import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();

const app = express();
app.use(express.json());

const prodOrigins = [
  process.env.PROD_ORIGIN1,
  process.env.PROD_ORIGIN2,
  process.env.PROD_ORIGIN3,
];
const devOrigin = [process.env.DEV_ORIGIN];

const allowedOrigins = process.env.ENV === "DEV" ? devOrigin : prodOrigins;

// Allow requests from frontend
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // If origin is in the list or request has no origin (e.g., Postman), allow it
        callback(null, true);
      } else {
        // If origin is not allowed, return an error
        callback(new Error("CORS not allowed for this origin"));
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
