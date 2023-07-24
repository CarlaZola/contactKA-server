import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { userRepository } from "../utils/getRepository";


const checkNameExists = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

   if("full_name" in req.body){
        const { full_name } = req.body

        const nameUser: boolean = await userRepository.exist({
            where: {
                full_name: full_name.toLowerCase()
            }
        })

        if(nameUser){
            throw new AppError('Name already exists', 409)
        }
        return next()
   }

    return next()
}


export {
    checkNameExists
}