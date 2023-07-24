import { z } from "zod"
import { contactArray } from "./contact.schema"

const user = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().email().max(120),
    phone: z.string().max(11),
    password: z.string().max(200),
    nickname: z.string().nullish().optional(),
    createdAt: z.string(),
    deletedAt: z.string().nullish()
})

const userRequest = user.omit({id: true, createdAt: true, deletedAt: true})
const userResponse = user.omit({password: true, originalEmail: true})

const userReadResponse = userResponse.extend({
    contacts: contactArray
})

const userUpdateRequest = userRequest.deepPartial()

const userArrayResponse = z.array(userResponse)

export {
    user,
    userRequest,
    userResponse,
    userReadResponse,
    userArrayResponse,
    userUpdateRequest
}