import "dotenv/config";
import express from "express";
import cors from "cors";
import conncetToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/health", (req, res, next) => {
  return res.status(200).json({ status: "healthy" });
});

app.use("/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await conncetToDatabase();
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} enviroment`);
    console.log("Succesfully connected to the databse");
  } catch (error) {
    console.log("Error while connecting to the database", error);
  }
});
