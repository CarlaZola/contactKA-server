import { User } from "../../entities";
import { AppError } from "../../error";
import {
  TLoginRequest,
  TLoginResponse,
} from "../../interfaces/login.interface";
import { userRepository } from "../../utils/getRepository";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (
  dataLogin: TLoginRequest
): Promise<TLoginResponse> => {
  const { email } = dataLogin;
  const { password } = dataLogin;

  const userExists: User | null = await userRepository.findOneBy({
    email: email,
  });

  if (!userExists) throw new AppError("Invalid credentials", 401);

  const checkPassword: boolean = await bcrypt.compare(
    password,
    userExists.password
  );

  if (!checkPassword) throw new AppError("Invalid credentials", 401);

  const token: string = jwt.sign(
    {
      id: userExists.id,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: userExists.id.toString(),
    }
  );

  return { token };
};

export { createLoginService };
