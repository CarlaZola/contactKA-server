import { Router } from "express"
import { createContactController, readAllContactsController, updateContactController } from "../controllers/contact/contact.controllers"
import { validatedBody } from "../middlewares/validatedBody.middle"
import { contactRequest } from "../schemas/contact.schema"
import { tokenValid } from "../middlewares/checkTokenValid.middle"
import { checkEmailExists } from "../middlewares/checkEmailExists.middle"
import { checkNameExists } from "../middlewares/checkNameExists.middle"
import { checkIdContactExists } from "../middlewares/checkContactExists.middle"
import { checkIdExists } from "../middlewares/checkIdExists.middle"


const contactRoutes: Router = Router()

contactRoutes.post('', tokenValid, validatedBody(contactRequest), checkEmailExists, checkNameExists, createContactController)
contactRoutes.get('', tokenValid, readAllContactsController)
contactRoutes.patch('/:id', tokenValid, checkIdContactExists, checkEmailExists, checkNameExists, updateContactController)
contactRoutes.delete('/:id', tokenValid, checkIdContactExists, )

export {
    contactRoutes
}