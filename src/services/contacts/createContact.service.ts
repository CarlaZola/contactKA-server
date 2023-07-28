import { AppError } from "../../error"
import { TContactRequest, TContactResponse } from "../../interfaces/contact.interface"
import { contact } from "../../schemas/contact.schema"
import { contactRepository, userRepository } from "../../utils/getRepository"

const createContactService = async (data: TContactRequest): Promise<TContactResponse> => {
    const { userId, ...rest} = data

    const user = await userRepository.findOneBy({id: +(userId)})

    if(!user) throw new AppError('User not found', 404)

    const newContact = contactRepository.create({
        ...rest,
        user
    })

    await contactRepository.save(newContact)

    return contact.parse(newContact)
}


export {
    createContactService
}