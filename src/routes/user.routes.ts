import { Router } from "express";
import { createUserController } from "../controllers/user/user.controllers";
import { checkEmailExists } from "../middlewares/checkEmailExists.middle";
import { validatedBody } from "../middlewares/validatedBody.middle";
import { userRequest } from "../schemas/user.schema";


const userRoutes: Router = Router()

userRoutes.post('',validatedBody(userRequest) , checkEmailExists, createUserController)


export default userRoutes