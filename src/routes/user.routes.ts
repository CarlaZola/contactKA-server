import { Router } from "express";
import { createUserController, deleteUserController, readAllUsersControllers, readUserController, updateUserController } from "../controllers/user/user.controllers";
import { checkEmailExists } from "../middlewares/checkEmailExists.middle";
import { validatedBody } from "../middlewares/validatedBody.middle";
import { userRequest, userUpdateRequest } from "../schemas/user.schema";
import { checkNameExists } from "../middlewares/checkNameExists.middle";
import { checkIdExists } from "../middlewares/checkIdExists.middle";


const userRoutes: Router = Router()

userRoutes.post('',validatedBody(userRequest) , checkEmailExists, checkNameExists,createUserController)
userRoutes.get('', readAllUsersControllers)
userRoutes.get('/:id', checkIdExists, readUserController)
userRoutes.patch("/:id", checkIdExists,validatedBody(userUpdateRequest), checkEmailExists, checkNameExists, updateUserController)
userRoutes.delete("/:id", checkIdExists, deleteUserController)


export default userRoutes