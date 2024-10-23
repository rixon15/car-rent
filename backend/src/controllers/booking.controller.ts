import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import bookingModel from "../models/booking.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, CREATED, INTERNAL_SERVER_ERROR } from "../constants/http";

const bookingSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(1),
  phoneNumber: z.string().min(10).max(10),
  address: z.string().min(1),
  carId: z.string().min(1),
  pickupDate: z.coerce.date(),
  pickupTime: z.string().min(1),
  dropoffDate: z.coerce.date(),
  dropoffTime: z.string().min(1),
});

export const createBookingHandler = catchErrors(async (req, res) => {
  const request = bookingSchema.parse({ ...req.body });

  //check if the booking is already in the database
  const existingBooking = await bookingModel.exists({ ...request });
  appAssert(
    !existingBooking,
    CONFLICT,
    "The booking already exists in the database"
  );
  //create a new booking
  const booking = await bookingModel.create({...request});
  appAssert(booking, INTERNAL_SERVER_ERROR, "Internal server error");
  //return the booking

  return res.status(CREATED).json(booking);
});
