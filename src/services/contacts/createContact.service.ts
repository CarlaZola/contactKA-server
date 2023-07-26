import { AppError } from "../../error"
import { TContactRequest, TContactResponse } from "../../interfaces/contact.interface"
import { contact } from "../../schemas/contact.schema"
import { contactRepository, userRepository } from "../../utils/getRepository"

const createContactService = async (data: TContactRequest, idUser: string): Promise<TContactResponse> => {

    const user = await userRepository.findOneBy({id: +(idUser)})

    if(!user) throw new AppError('User not found', 404)

    const newContact = contactRepository.create({
        ...data,
        user
    })

    await contactRepository.save(newContact)

    return contact.parse(newContact)
}


export {
    createContactService
}