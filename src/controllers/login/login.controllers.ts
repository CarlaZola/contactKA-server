import { Request, Response } from "express";
import { createLoginService } from "../../services/login/createLogin.service";
import { TLoginResponse } from "../../interfaces/login.interface";

const loginController = async(req: Request, res: Response): Promise<Response> => {

    const newSession: TLoginResponse = await createLoginService(req.body)

    return res.json(newSession)
}

export {
    loginController
}
