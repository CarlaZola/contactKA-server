import { NextFunction, Request, Response } from "express";
import { Contact } from "../entities";
import { AppError } from "../error";
import { contactRepository } from "../utils/getRepository";

const checkIdContactExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params;

  const user: Contact | null = await contactRepository.findOne({
    where: {
      id: +id,
    },
  });

  if (!user) {
    throw new AppError("Contact not found", 404);
  }

  return next();
};

export { checkIdContactExists };
