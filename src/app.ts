import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDatabase from "./utils/connectDatabase";
import logger from "./utils/logger";
import routes from "./routes";

dotenv.config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.ENV;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, async () => {
  logger.info(`App running in ${NODE_ENV} mode on port ${PORT}`);
  await connectDatabase();

  routes(app);
});
