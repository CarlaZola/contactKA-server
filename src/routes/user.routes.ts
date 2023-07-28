import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readAllUsersControllers,
  readUserController,
  updateUserController,
} from "../controllers/user/user.controllers";
import { checkEmailExists } from "../middlewares/checkEmailExists.middle";
import { validatedBody } from "../middlewares/validatedBody.middle";
import { userRequest, userUpdateRequest } from "../schemas/user.schema";
import { checkNameExists } from "../middlewares/checkNameExists.middle";
import { checkIdExists } from "../middlewares/checkIdExists.middle";
import { tokenValid } from "../middlewares/checkTokenValid.middle";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validatedBody(userRequest),
  checkEmailExists,
  checkNameExists,
  createUserController
);

userRoutes.get("", readAllUsersControllers);
userRoutes.get("/:id", tokenValid, checkIdExists, readUserController);

userRoutes.patch(
  "/:id",
  tokenValid,
  checkIdExists,
  validatedBody(userUpdateRequest),
  checkEmailExists,
  checkNameExists,
  updateUserController
);

userRoutes.delete("/:id", tokenValid, checkIdExists, deleteUserController);

export default userRoutes;
