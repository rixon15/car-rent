import { Router } from "express";
import { createBookingHandler, deleteBookingHandler } from "../controllers/booking.controller";

const bookingRoutes = Router();
//prefix /booking
bookingRoutes.post("/:id", createBookingHandler);
bookingRoutes.delete("/:id", deleteBookingHandler);

export default bookingRoutes;
