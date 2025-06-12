import { Router } from "express";
import  { postData }  from "../controllers/dataController";

//Make a new Express router
const dataRoutes = Router();

dataRoutes.post("/data", postData);

export default dataRoutes;