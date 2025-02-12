import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.route";
import carRoutes from "./routes/car.routes";
import paymentRoutes from "./routes/payment.routes";
import bookingRoutes from "./routes/booking.routes";
import connectToDatabase from "./config/db";
import carSeeder from "./seeders/car.seeder";
import {NODE_ENV} from "./constants/env";

const app = express();

const needSeeding = false;

app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({extended: true, limit: "25mb"}));

// const allowedOrigins = [
//     "https://ancient-cove-67501-f84c5b032c8a.herokuapp.com/", // Replace with your actual  URL
//     "http://localhost:5173", // For local development
//     // Add other allowed origins as needed
// ];

// app.use(
//     cors({
//         origin: function (origin, callback) {
//             if (!origin || allowedOrigins.includes(origin)) { // Allow requests without origin (like Postman) or from allowed origins
//                 callback(null, true);
//             } else {
//                 callback(new Error("Not allowed by CORS"));
//             }
//         },
//         credentials: true, // Only if you're using cookies
//     })
// );

app.use(cors());
app.use(cookieParser());


app.get("/health", (req, res, next) => {
    return res.status(200).json({status: "healthy"});
});

//auth routes
app.use("/auth", authRoutes);
app.use("/car", carRoutes);

//protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
app.use("/payment", authenticate, paymentRoutes);
app.use("/booking", authenticate, bookingRoutes);

app.use(errorHandler);


app.use(express.static(path.join(__dirname, "../frontend", "/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


const port = process.env.PORT || 4004; // Use Heroku's PORT or 5000 locally
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

app.listen(port, async () => {
    try {
        await connectToDatabase();
        if (needSeeding) {
            await carSeeder();
        }
        console.log(`Server is running on port ${port} in ${NODE_ENV} environment`);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.log("Error while connecting to the database", error);
    }
});
