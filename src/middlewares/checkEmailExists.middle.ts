import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import {  contactRepository, userRepository } from "../utils/getRepository";
import { Contact, User } from "../entities";


const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
   if("email" in req.body){
    
        const { email } = req.body

        if(req.baseUrl === "/client"){
            const emailUser: User | null = await userRepository.findOne({
                where: {
                    email: email
                }
            })
            if(emailUser){
                throw new AppError('Email already exists', 409)
            }
        }

        if(req.baseUrl === "/contact"){
            const emailUser: Contact | null = await contactRepository.findOne({
                where: {
                    email: email
                }
            })
            if(emailUser){
                throw new AppError('Email already exists', 409)
            }
        }

        

        return next()
   }

    return next()

}


export {
    checkEmailExists
}