import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://quick-bite-henna-one.vercel.app",
  "https://quick-bite-shrey-prajapatis-projects.vercel.app",
  "https://quick-bite-git-main-shrey-prajapatis-projects.vercel.app",
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
