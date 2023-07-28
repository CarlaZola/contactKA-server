import { NextFunction, Request, Response } from "express";
import { userRepository } from "../utils/getRepository";
import { User } from "../entities";
import { AppError } from "../error";

const checkIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const user: User | null = await userRepository.findOne({
    where: {
      id: +id,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export { checkIdExists };
