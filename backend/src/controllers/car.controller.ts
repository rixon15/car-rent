import z from "zod";
import catchErrors from "../utils/catchErrors";
import {createCar} from "../services/car.service";
import {CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, OK,} from "../constants/http";
import CarModel from "../models/car.model";
import appAssert from "../utils/appAssert";
import {uploadImage} from "../services/image.service";
import extractSearchOptions from "../utils/extractSearchOptions";

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
    images: z.string().array(),
    type: z.nativeEnum(CAR_TYPES),
    capacity: z.number().gte(1),
    transmission: z.nativeEnum(TRANSMISSION_TYPES),
    fuelCapacity: z.number().gte(50),
    price: z.number().gte(1),
    reviews: z.array(z.object({}))
});

export const createCarHandler = catchErrors(async (req, res) => {
    //validate request
    const request = carSchema.parse({...req.body});
    const imageUrls: string[] = [];
    //call the upload image service
    // const imgUrl = await uploadImage(request.image);
    request.images.forEach(async (image) => {
        await uploadImage(image).then((url) => imageUrls.push(url as string));
    })
    //set the image path
    request.images = imageUrls;
    //call service
    const car = await createCar(request);
    //error handling
    appAssert(car, INTERNAL_SERVER_ERROR, "Internal Server Error");
    //return response

    return res.status(CREATED).json(car);
});

export const getCarHandler = catchErrors(async (req, res) => {
    //get the car id
    const id = req.params.id;

    //search for the specific car by id
    const car = await CarModel.findById(id).populate({
        path: 'bookings',
        model: 'Booking',
    }).exec();

    appAssert(car, NOT_FOUND, "Car not found in the database");

    //return the car
    return res.status(OK).json(car);
});

export const getPopularCarsHandler = catchErrors(async (req, res) => {
    //get the first 4 most popular cars by views
    const mostPopularCars = await CarModel.find().sort({views: -1}).limit(4);
    appAssert(mostPopularCars, INTERNAL_SERVER_ERROR, "Internal server error");

    //return the popular car object
    return res.status(OK).json(mostPopularCars);
});

export const getListOfCarsHandler = catchErrors(async (req, res) => {
    const pageNumber: number = parseInt(req.query.page as string);
    const carsPerPage: number = parseInt(req.query.number as string);

    //get the list of cars by page
    const carList = await CarModel.find()
        .skip((pageNumber - 1) * carsPerPage)
        .limit(carsPerPage);
    appAssert(carList, INTERNAL_SERVER_ERROR, "Internal server error");

    //return the car list

    res.status(OK).json(carList);
});

export const deleteCarHandler = catchErrors(async (req, res) => {
    const id = z.string().parse(req.params.id);
    //delete the car based on id
    const deletedCar = await CarModel.findByIdAndDelete(id);
    appAssert(deletedCar, NOT_FOUND, "Car not found in the database");
    //return a message

    res.status(OK).json({
        message: "Car deleted successfully",
    });
});

export const searchCarHandler = catchErrors(async (req, res) => {
    //extract the options
    const searchOptions = extractSearchOptions(req.query);

    const page = req.query.page;
    const TypesRegex = new RegExp(`${searchOptions.carTypes.join("|")}`);
    const nameRegex = new RegExp(req.query.searchTerm as string);
    const capacityValues: number[] = [];
    searchOptions.capacity.map((capacity) => {
        capacityValues.push(
            parseInt(capacity.slice(capacity.length - 1, capacity.length))
        );
    });

    const carList = await CarModel.find({
        name: {$regex: nameRegex},
        type: {$regex: TypesRegex},
        capacity: {$in: capacityValues},
    })
        .limit(parseInt(page as string) * 9);

    res.status(OK).json(carList);
});

