import mongoose from "mongoose";

interface CarDocument extends mongoose.Document {
  name: string;
  description: string;
  image: string;
  type: string;
  capacity: number;
  transmission: string;
  fuelCapacity: number;
  price: number;
  views: number;
}

const carSchema = new mongoose.Schema<CarDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: "/" },
    type: { type: String, required: true },
    capacity: { type: Number, required: true },
    transmission: { type: String, required: true },
    fuelCapacity: { type: Number, required: true },
    price: { type: Number, required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const CarModel = mongoose.model<CarDocument>("Car", carSchema);
export default CarModel;
