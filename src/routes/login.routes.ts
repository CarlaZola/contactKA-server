import { Router } from "express";
import { loginController } from "../controllers/login/login.controllers";
import { validatedBody } from "../middlewares/validatedBody.middle";
import { loginRequest } from "../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post("", validatedBody(loginRequest), loginController);

export default loginRoutes;
