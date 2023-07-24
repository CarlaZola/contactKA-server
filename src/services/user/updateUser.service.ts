import { TUserResponse, TUserUpdateRequest } from "../../interfaces/user.interface"
import { userResponse } from "../../schemas/user.schema"
import { userRepository } from "../../utils/getRepository"

const updateUserService = async (dataUser: TUserUpdateRequest, idUser: string): Promise<TUserResponse>=> {

    const user = await userRepository.findOneBy({id: +(idUser)})

    const newUser = userRepository.create({
        ...user, 
        ...dataUser
    })
    console.log(newUser)
    await userRepository.save(newUser)

    return userResponse.parse(newUser)
}

export {
    updateUserService
}