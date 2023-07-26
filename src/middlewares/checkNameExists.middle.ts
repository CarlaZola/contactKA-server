import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { contactRepository, userRepository } from "../utils/getRepository";
import { Contact, User } from "../entities";


const checkNameExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

   if("full_name" in req.body){
        let { full_name } = req.body 

        if(req.baseUrl === "/client"){
            if(req.method === "POST"){
            full_name = full_name.toLowerCase()
            }
        
            const nameUser: User | null = await userRepository.findOne({
                where: {
                    full_name: full_name
                }
            })

            if(nameUser){
                throw new AppError('Name already exists', 409)
            }
            return next()
        }

        if(req.baseUrl === "/contact"){
            if(req.method === "POST"){
                full_name = full_name.toLowerCase()
            }
            
            const nameUser: Contact | null = await contactRepository.findOne({
                where: {
                    full_name: full_name
                }
            })

            if(nameUser){
                throw new AppError('Name already exists', 409)
            }
            return next()
        }
   }

    return next()
}


export {
    checkNameExists
}