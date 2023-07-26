import { TContactArray } from "../../interfaces/contact.interface"
import { contactRepository } from "../../utils/getRepository"


const readAllContactService = async(): Promise<TContactArray> => {

    const contacts = contactRepository.find()

    return contacts
}


export {
    readAllContactService
}