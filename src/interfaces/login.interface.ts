import { z } from "zod"
import { loginRequest, loginResponse } from "../schemas/login.schema"

type TLoginRequest = z.infer<typeof loginRequest>
type TLoginResponse = z.infer<typeof loginResponse>

export {
    TLoginRequest,
    TLoginResponse
}