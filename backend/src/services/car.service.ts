import { CONFLICT } from "../constants/http";
import CarModel from "../models/car.model";
import appAssert from "../utils/appAssert";

type CreateCarParams = {
  name: string;
  description: string;
  image: string;
  type: string;
  capacity: number;
  transmission: string;
  fuelCapacity: number;
  price: number;
};

export const createCar = async (data: CreateCarParams) => {
  //verify car doesn't exist
  const existingCar = await CarModel.exists({
    name: data.name,
    type: data.type,
    transmission: data.transmission,
  });
  appAssert(!existingCar, CONFLICT, "Car already in the database");

  //create car
  const car = await CarModel.create(data);
  //return the newly created car

  return car;
};
