import "dotenv/config";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_SECRET);
    console.log("DB connected!");
  } catch (error) {
    console.log(error.message);
  }
}

export default connectDatabase;
