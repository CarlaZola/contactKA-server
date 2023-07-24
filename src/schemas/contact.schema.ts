import { z } from "zod"


const contact = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().email().max(120),
    phone: z.string().max(11),
    nickname: z.string().nullish().optional(),
    createdAt: z.string(),
    clientId: z.number() 
})

const contactRequest = contact.omit({id: true, createdAt: true})


export {
    contact,
    contactRequest
}