import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/MERN_JOB_SEEKING_WEBAPP";

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error(" MongoDB Connection Failed:", error.message);
    process.exit(1); 
  }
};
