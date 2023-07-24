import { User } from "../../entities"
import { TUserArrayResponse, TUserResponse } from "../../interfaces/user.interface"
import { userArrayResponse, userResponse } from "../../schemas/user.schema"
import { userRepository } from "../../utils/getRepository"

const readAllUserService = async(): Promise<TUserArrayResponse> => {

    const users: User[] = await userRepository.find()

    const returnUsers = userArrayResponse.parse(users)

    return returnUsers

   
}

export {
    readAllUserService
}