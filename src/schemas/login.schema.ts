import { z } from "zod"

const loginRequest = z.object({
    email: z.string().email().max(120),
    password: z.string().max(120)
})

const loginResponse = z.object({
    token: z.string()
})


export {
    loginRequest,
    loginResponse
}