import { User } from "../../entities";
import { contactRepository, userRepository } from "../../utils/getRepository";

const contactService = async (idUser: number) => {
  const user: User | null = await userRepository.findOneBy({ id: idUser });

  const contact = await contactRepository
    .createQueryBuilder("contact")
    .where('contact."userId" = :userId', { userId: idUser })
    .getMany();

  return contact;
};

export { contactService };
