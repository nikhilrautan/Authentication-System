import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    console.log("Trying to connect DB...");

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("MongoDB Error:");
    console.log(err);

    process.exit(1);
  }
};

export default db;