import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";

const createUserController = async(req: Request, res: Response): Promise<Response> => {

    const newClient = await createUserService(req.body)

    return res.status(201).json(newClient)
}


export {
    createUserController
}