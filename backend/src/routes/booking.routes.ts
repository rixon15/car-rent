import { Router } from "express";
import { createBookingHandler } from "../controllers/booking.controller";

const bookingRoutes = Router();
//prefix /:id/booking
bookingRoutes.post("", createBookingHandler);

export default bookingRoutes;
