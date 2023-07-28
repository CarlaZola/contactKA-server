import { z } from "zod";
import {
  userArrayResponse,
  userReadResponse,
  userRequest,
  userResponse,
} from "../schemas/user.schema";
import { DeepPartial } from "typeorm";

type TUserRequest = z.infer<typeof userRequest>;
type TUserResponse = z.infer<typeof userResponse>;
type TUserUpdateRequest = DeepPartial<TUserRequest>;
type TUserReadResponse = z.infer<typeof userReadResponse>;
type TUserArrayResponse = z.infer<typeof userArrayResponse>;

export {
  TUserRequest,
  TUserResponse,
  TUserUpdateRequest,
  TUserReadResponse,
  TUserArrayResponse,
};
