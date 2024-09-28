import { Router } from "express";
import {
  createCarHandler,
  getCarHandler,
  getPopularCarsHandler,
} from "../controllers/car.controller";

const carRoutes = Router();

carRoutes.post("/create", createCarHandler);
carRoutes.get("/popular", getPopularCarsHandler);
carRoutes.get("/:id", getCarHandler);

export default carRoutes;
