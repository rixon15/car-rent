import {INTERNAL_SERVER_ERROR} from "../constants/http";
import {createCar} from "../services/car.service";
import appAssert from "../utils/appAssert";
import {cars} from "../constants/car.seeder.data";

const carSeeder = async () => {
    let isSeeding = true;

    for (let i = 0; i < 12; ++i) {
        const car = await createCar(cars[i]);
        appAssert(car, INTERNAL_SERVER_ERROR, "Intenal Server Error");
    }

    isSeeding = false;

    return "Database seeded with cars!";
};

export default carSeeder;
