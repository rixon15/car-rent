import { Router } from "express";
import {
  createCarHandler,
  getCarHandler,
  getListOfCars,
  getPopularCarsHandler,
} from "../controllers/car.controller";

const carRoutes = Router();

//implement role check for create and delete car routes

carRoutes.post("/create", createCarHandler);
carRoutes.get("/popular", getPopularCarsHandler);
carRoutes.get('/list', getListOfCars)
carRoutes.get("/:id", getCarHandler);

export default carRoutes;
