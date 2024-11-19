import mongoose from "mongoose";

interface Ireview {
    userName: string;
    text: string;
}

interface CarDocument extends mongoose.Document {
    name: string;
    description: string;
    images: string[];
    type: string;
    capacity: number;
    transmission: string;
    fuelCapacity: number;
    price: number;
    views: number;
    reviews: Ireview[];
}

const carSchema = new mongoose.Schema<CarDocument>(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        images: Array<string>,
        type: {type: String, required: true},
        capacity: {type: Number, required: true},
        transmission: {type: String, required: true},
        fuelCapacity: {type: Number, required: true},
        price: {type: Number, required: true},
        views: {type: Number, default: 0},
        reviews: Array<Ireview>,
    },
    {
        timestamps: true,
    }
);

const CarModel = mongoose.model<CarDocument>("Car", carSchema);
export default CarModel;
