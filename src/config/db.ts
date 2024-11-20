import mongoose from "mongoose";
import Config from "./config";


export const connectDB = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    console.log("Already connected to MongoDB. Disconnecting first...");
    await mongoose.disconnect()
  }
  try {
      const dbUrl = Config.mongo.url as string;
      await mongoose.connect(dbUrl);
      console.log(`Connected to MongoDB Successfully`);
      console.log("█▀███████▀█");
      console.log("█ █▀▀▀▀▀█ █");
      console.log("Hello, logistics api is live !!!!");

  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};



