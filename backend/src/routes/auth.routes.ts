import { registerHandler } from "./../controllers/auth.controller";
import { Router } from "express";

const authRoutes = Router();

//prefix /auth
authRoutes.post("/register", registerHandler);

export default authRoutes;
