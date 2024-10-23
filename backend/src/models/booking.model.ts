import mongoose from "mongoose";

interface bookingDocument extends mongoose.Document {
  userId: string;
  name: string;
  phoneNumber: string;
  address: string;
  carId: string;
  pickupDate: Date;
  pickupTime: string;
  dropoffDate: Date;
  dropoffTime: string;
  verified: boolean;
}

const bookingSchema = new mongoose.Schema<bookingDocument>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    carId: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    dropoffDate: { type: Date, required: true },
    dropoffTime: { type: String, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model<bookingDocument>("Booking", bookingSchema);
export default bookingModel;
