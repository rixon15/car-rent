import z from "zod";
import catchErrors from "../utils/catchErrors";
import { createCar } from "../services/car.service";
import {
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "../constants/http";
import CarModel from "../models/car.model";
import appAssert from "../utils/appAssert";

enum CAR_TYPES {
  Sport = "Sport",
  Suv = "Suv",
  MPV = "MPV",
  Sedan = "Sedan",
  Coupe = "Coupe",
  Hatchback = "Hatchback",
}

enum TRANSMISSION_TYPES {
  Manual = "Manual",
  Automatic = "Automatic",
}

const carSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  image: z.string(),
  type: z.nativeEnum(CAR_TYPES),
  capacity: z.number().gte(1),
  transmission: z.nativeEnum(TRANSMISSION_TYPES),
  fuelCapacity: z.number().gte(50),
  price: z.number().gte(1),
});

export const createCarHandler = catchErrors(async (req, res) => {
  //validate request
  const request = carSchema.parse({ ...req.body });
  //call service
  const car = await createCar(request);
  //return response

  return res.status(CREATED).json(car);
});

export const getCarHandler = catchErrors(async (req, res) => {
  //get the car id
  const id = req.params.id;

  //search for the specific car by id
  const car = await CarModel.findById(id);
  appAssert(car, NOT_FOUND, "Car not found in the database");

  //return the car
  return res.status(OK).json(car);
});

export const getPopularCarsHandler = catchErrors(async (req, res) => {
  //get the first 4 most popular cars by views
  const mostPopularCars = await CarModel.find().sort({ views: -1 }).limit(4);
  appAssert(mostPopularCars, INTERNAL_SERVER_ERROR, "Internal server error");

  //return the popular car object
  return res.status(OK).json(mostPopularCars);
});
