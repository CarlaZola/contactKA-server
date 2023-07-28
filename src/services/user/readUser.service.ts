import { TUserReadResponse } from "../../interfaces/user.interface";
import { userReadResponse } from "../../schemas/user.schema";
import { userRepository } from "../../utils/getRepository";

const readUserService = async (id: string): Promise<TUserReadResponse> => {
  const user = await userRepository.findOne({
    where: {
      id: +id,
    },
    relations: {
      contacts: true,
    },
  });

  return userReadResponse.parse(user);
};

export { readUserService };
