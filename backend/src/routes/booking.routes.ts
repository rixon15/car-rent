import { Router } from "express";
import {
    confirmBookingHandler,
    createBookingHandler,
    deleteBookingHandler,
    getBookingsHandler
} from "../controllers/booking.controller";

const bookingRoutes = Router();
//prefix /booking
bookingRoutes.get('/', getBookingsHandler)
bookingRoutes.post("/:id", createBookingHandler);
bookingRoutes.delete("/:id", deleteBookingHandler);
bookingRoutes.post('/:id/confirm', confirmBookingHandler);

export default bookingRoutes;
