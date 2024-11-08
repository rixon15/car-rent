import { Router } from "express";
import {
  // bookCarHandler,
  createCarHandler,
  deleteCarHandler,
  getCarHandler,
  getListOfCarsHandler,
  getPopularCarsHandler,
  searchCarHandler,
} from "../controllers/car.controller";

const carRoutes = Router();

//implement role check for create and delete car routes
//prefix /car
carRoutes.post("/create", createCarHandler);
carRoutes.get("/popular", getPopularCarsHandler);
carRoutes.get("/list", getListOfCarsHandler);
carRoutes.get("/search", searchCarHandler);
// carRoutes.post("/:id/booking", bookCarHandler);
carRoutes.get("/:id", getCarHandler);
carRoutes.delete("/:id", deleteCarHandler);

export default carRoutes;
