import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";
import { readUserService } from "../../services/user/readUser.service";
import { readAllUserService } from "../../services/user/readAllUsers.service";
import { updateUserService } from "../../services/user/updateUser.service";
import { userRemoveService } from "../../services/user/softRemove.service";

const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newClient = await createUserService(req.body);

  return res.status(201).json(newClient);
};

const readUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const user = await readUserService(id);

  return res.json(user);
};

const readAllUsersControllers = async (
  _: Request,
  res: Response
): Promise<Response> => {
  const users = await readAllUserService();

  return res.json(users);
};

const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const user = await updateUserService(req.body, id);

  return res.json(user);
};

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  await userRemoveService(id);

  return res.status(204).send();
};

export {
  createUserController,
  readUserController,
  readAllUsersControllers,
  updateUserController,
  deleteUserController,
};
