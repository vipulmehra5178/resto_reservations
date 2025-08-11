import mongoose from "mongoose";

const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise(r => setTimeout(r, 3000)); 
  }
  if (!retries) {
    console.error("❌ Could not connect to MongoDB, exiting...");
    process.exit(1);
  }
};

export default connectDB;
