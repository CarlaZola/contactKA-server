import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import jwt from "jsonwebtoken";

const tokenValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  let { authorization } = req.headers;

  if (!authorization) throw new AppError("Missing bearer token", 401);

  authorization = authorization.split(" ")[1];

  jwt.verify(
    authorization,
    String(process.env.SECRET_KEY),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }

      res.locals.token = {
        idUser: +decoded.sub,
      };
    }
  );

  return next();
};

export { tokenValid };
