import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { createCar } from "../services/car.service";
import appAssert from "../utils/appAssert";

const cars = {
  description: "testCar",
  image:
    "https://res.cloudinary.com/dcgceac4l/image/upload/v1731081043/heroImage1_javvmz.svg",
  type: "sport",
  capacity: 2,
  transmission: "manual",
  fuelCapacity: 70,
  price: 8000,
  views: 50,
};

const carSeeder = async () => {
  let isSeeding = true;

  for (let i = 0; i < 12; ++i) {
    const car = await createCar({ name: `testCar${i}`, ...cars });
    appAssert(car, INTERNAL_SERVER_ERROR, "Intenal Server Error");
  }

  isSeeding = false;

  return "Database seeded with cars!";
};

export default carSeeder;
