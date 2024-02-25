import mongoose from "mongoose";
import logger from "./logger";

async function connectDatabase() {
  const dbUri = process.env.DB_URI ?? "";

  try {
    await mongoose.connect(dbUri);
    logger.info(`Database connected`);
  } catch (error: any) {
    console.log(error);
    logger.error(`Could not connect to database!`, error);
    process.exit(1);
  }
}

export default connectDatabase;
