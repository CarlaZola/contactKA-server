import AppDataSource from "../data-source";
import { Repository } from "typeorm";
import { Contact, User } from "../entities";

const userRepository: Repository<User> = AppDataSource.getRepository(User);
const contactRepository: Repository<Contact> =
  AppDataSource.getRepository(Contact);

export { userRepository, contactRepository };
