import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { userRepository } from "../utils/getRepository";
import { User } from "../entities";


const checkEmailExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
   if("email" in req.body){
        const { email } = req.body

        const emailUser: User | null = await userRepository.findOne({
            where: {
                email: email
            }
        })

        if(emailUser){
            throw new AppError('Email already exists', 409)
        }

        return next()
   }

    return next()

}


export {
    checkEmailExists
}