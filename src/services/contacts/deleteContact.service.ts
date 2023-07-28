import { Contact } from "../../entities";
import { contactRepository } from "../../utils/getRepository";

const deleteContactService = async (contacId: string): Promise<void> => {
  const contact: Contact | null = await contactRepository.findOneBy({
    id: +contacId,
  });

  await contactRepository.remove(contact!);
};

export { deleteContactService };
