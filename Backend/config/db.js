import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database has been connected successfully");
  } catch (error) {
    throw new Error(error);
    process.exit(1);
  }
};
