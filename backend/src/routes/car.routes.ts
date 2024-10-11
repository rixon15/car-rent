import { Router } from "express";
import {
  createCarHandler,
  deleteCarHandler,
  getCarHandler,
  getListOfCarsHandler,
  getPopularCarsHandler,
} from "../controllers/car.controller";

const carRoutes = Router();

//implement role check for create and delete car routes

carRoutes.post("/create", createCarHandler);
carRoutes.get("/popular", getPopularCarsHandler);
carRoutes.get("/list", getListOfCarsHandler);
carRoutes.get("/:id", getCarHandler);
carRoutes.delete("/:id", deleteCarHandler);

export default carRoutes;
