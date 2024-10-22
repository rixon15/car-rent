import { Router } from "express";
import { paymentIntentHandler } from "../controllers/payment.controller";

const paymentRoutes = Router();

paymentRoutes.post("/:id", paymentIntentHandler);

export default paymentRoutes;
