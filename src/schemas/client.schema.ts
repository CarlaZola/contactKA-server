import { z } from "zod"

const client = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().email().max(120),
    phone: z.string().max(11),
    password: z.string().max(200),
    nickname: z.string().nullish().optional(),
    createdAt: z.string()
})

const clientRequest = client.omit({id: true, createdAt:true})
const clientResponse = client.omit({password: true})


export {
    client,
    clientRequest,
    clientResponse
}