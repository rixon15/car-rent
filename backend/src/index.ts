import "dotenv/config";
import express from "express";
import cors from "cors";
import conncetToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.route";
import carRoutes from "./routes/car.routes";
import paymentRoutes from "./routes/payment.routes";
import bookingRoutes from "./routes/booking.routes";

const app = express();

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
// app.use(
//   cors({
//     origin: APP_ORIGIN,
//     credentials: true,
//   })
// );
app.use(cors());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/health", (req, res, next) => {
  return res.status(200).json({ status: "healthy" });
});

//auth routes
app.use("/auth", authRoutes);
app.use("/car", carRoutes);

//protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use("/payment", paymentRoutes);
app.use("/booking", bookingRoutes);

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
