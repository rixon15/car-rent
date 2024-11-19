import {INTERNAL_SERVER_ERROR} from "../constants/http";
import {createCar} from "../services/car.service";
import appAssert from "../utils/appAssert";

const cars = {
    description: "testCar",
    images:
        ["https://res.cloudinary.com/dcgceac4l/image/upload/v1731081043/heroImage1_javvmz.svg", 'https://res.cloudinary.com/dcgceac4l/image/upload/v1732040013/View_2_lpjikp.jpg', 'https://res.cloudinary.com/dcgceac4l/image/upload/v1732040020/View_3_rtfpgo.png'
        ],
    type: "sport",
    capacity: 2,
    transmission: "manual",
    fuelCapacity: 70,
    price: 8000,
    views: 50,
    reviews: [
        {
            userName: 'testUser1',
            text: 'We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'
        },
        {
            userName: 'testUser2',
            text: 'We are greatly helped by the services of the MORENT Application. Morent has low prices and also a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.'
        }
    ]
};

const carSeeder = async () => {
    let isSeeding = true;

    for (let i = 0; i < 12; ++i) {
        const car = await createCar({name: `testCar${i}`, ...cars});
        appAssert(car, INTERNAL_SERVER_ERROR, "Intenal Server Error");
    }

    isSeeding = false;

    return "Database seeded with cars!";
};

export default carSeeder;
