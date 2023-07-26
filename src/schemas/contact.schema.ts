import { z } from "zod"


const contact = z.object({
    id: z.number(),
    full_name: z.string().max(255),
    email: z.string().email().max(120),
    phone: z.string().max(18).regex(new RegExp(/^\([0-9]{2}\) (?:[1-9]|9[1-9])[0-9]{3}\-[0-9]{4}$/), "Must follow the format (xx) xxxxx-xxxx"),
    nickname: z.string().nullish().optional(),
    createdAt: z.string(),
})

const contactRequest = contact.omit({id: true, createdAt: true})
const contactArray = z.array(contact)
const contactUpdate = contactRequest.deepPartial()

export {
    contact,
    contactRequest,
    contactArray,
    contactUpdate
}