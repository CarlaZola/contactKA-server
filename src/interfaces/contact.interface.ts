import { z } from "zod";
import { contact, contactArray, contactRequest } from "../schemas/contact.schema";
import { DeepPartial } from "typeorm";

type TContactRequest = z.infer<typeof contactRequest>
type TContactResponse = z.infer<typeof contact>
type TContactUpdate = DeepPartial<TContactRequest>
type TContactArray = z.infer<typeof contactArray>


export {
    TContactRequest,
    TContactResponse,
    TContactUpdate,
    TContactArray
}