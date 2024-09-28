import { Router } from "express";
import { createCarHandler } from "../controllers/car.controller";

const carRoutes = Router();

carRoutes.post("/create", createCarHandler);

export default carRoutes;
