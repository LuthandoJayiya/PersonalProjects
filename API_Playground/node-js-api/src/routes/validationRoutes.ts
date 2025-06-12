import { Router } from "express";
import { validateInput } from "../controllers/validateInput";

//Make a new Express router
const validationRoutes = Router();

validationRoutes.post("/validate", validateInput);

export default validationRoutes;