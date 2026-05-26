import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    
    console.log("Trying to connect DB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Error connecting to MongoDB:", err.message);
  }
};

export default db;