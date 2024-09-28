import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createCar } from "../services/car.service";
import { CREATED } from "../constants/http";

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
