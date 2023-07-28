import { TContactResponse } from "../../interfaces/contact.interface";
import { contact } from "../../schemas/contact.schema";
import { contactRepository } from "../../utils/getRepository";

const readAllContactService = async (id: string): Promise<TContactResponse> => {
  const contacts = await contactRepository.findOneBy({ id: +id });

  return contact.parse(contacts);
};

export { readAllContactService };
