import { TUserArrayResponse } from "../../interfaces/user.interface"
import { userArrayResponse } from "../../schemas/user.schema"
import { userRepository } from "../../utils/getRepository"

const readAllUserService = async(): Promise<TUserArrayResponse> => {

    const users = await userRepository.find()

    return userArrayResponse.parse(users)
}

export {
    readAllUserService
}