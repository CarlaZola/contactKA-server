import { TUserRequest, TUserResponse } from "../../interfaces/user.interface";
import { userResponse } from "../../schemas/user.schema";
import { userRepository } from "../../utils/getRepository";

const createUserService = async (
  dataClient: TUserRequest
): Promise<TUserResponse> => {
  const user = userRepository.create(dataClient);

  await userRepository.save(user);

  const userCreated = userResponse.parse(user);

  return userCreated;
};

export { createUserService };
