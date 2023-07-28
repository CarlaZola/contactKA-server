import {
  TContactResponse,
  TContactUpdate,
} from "../../interfaces/contact.interface";
import { contact } from "../../schemas/contact.schema";
import { contactRepository } from "../../utils/getRepository";

const updateContactService = async (
  data: TContactUpdate,
  contactId: string
): Promise<TContactResponse> => {
  const oldContact = await contactRepository.findOneBy({ id: +contactId });

  const newContact = contactRepository.create({
    ...oldContact,
    ...data,
  });

  await contactRepository.save(newContact);

  return contact.parse(newContact);
};

export { updateContactService };
