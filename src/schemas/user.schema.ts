import { z } from "zod"

const user = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().email().max(120),
    phone: z.string().max(11),
    password: z.string().max(200),
    nickname: z.string().nullish().optional(),
    createdAt: z.string()
})

const userRequest = user.omit({id: true, createdAt:true})
const userResponse = user.omit({password: true})


export {
    user,
    userRequest,
    userResponse
}