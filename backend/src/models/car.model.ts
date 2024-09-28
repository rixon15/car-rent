import mongoose from "mongoose";

interface CarDocument extends mongoose.Document {
  name: string;
  description: string;
  type: string;
  capacity: number;
  transmission: string;
  fuelCapacity: number;
  price: number;
}

const carSchema = new mongoose.Schema<CarDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuelCapacity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CarModel = mongoose.model<CarDocument>("Car", carSchema);
export default CarModel;
