import AppDataSource from "../data-source";
import { Repository } from "typeorm";
import { User } from "../entities";



const userRepository: Repository<User> = AppDataSource.getRepository(User) 



export {
    userRepository,
}