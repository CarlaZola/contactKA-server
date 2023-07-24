import { User } from "../../entities"
import { userRepository } from "../../utils/getRepository"


const userRemoveService = async (idUser: string): Promise<void> => {  
    const user: User | null = await userRepository.findOne({
        where: {
            id: +(idUser)
        }
    })

   await userRepository.remove(user!)  

}


export {
    userRemoveService
}