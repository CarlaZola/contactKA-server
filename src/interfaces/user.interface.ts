import { z } from "zod"
import { userRequest, userResponse } from "../schemas/user.schema"

type TUserRequest = z.infer<typeof userRequest>
type TUserResponse = z.infer<typeof userResponse>

export {
    TUserRequest,
    TUserResponse
}