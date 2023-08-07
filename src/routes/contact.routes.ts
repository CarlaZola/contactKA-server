import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  readAllContactsController,
  readContact,
  updateContactController,
} from "../controllers/contact/contact.controllers";
import { validatedBody } from "../middlewares/validatedBody.middle";
import { contactRequest, contactUpdate } from "../schemas/contact.schema";
import { tokenValid } from "../middlewares/checkTokenValid.middle";
import { checkEmailExists } from "../middlewares/checkEmailExists.middle";
import { checkNameExists } from "../middlewares/checkNameExists.middle";
import { checkIdContactExists } from "../middlewares/checkContactExists.middle";

const contactRoutes: Router = Router();

contactRoutes.post(
  "",
  tokenValid,
  validatedBody(contactRequest),
  checkEmailExists,
  checkNameExists,
  createContactController
);
contactRoutes.get(
  "/:id",
  tokenValid,
  checkIdContactExists,
  readAllContactsController
);

contactRoutes.get("", tokenValid, readContact);

contactRoutes.patch(
  "/:id",
  tokenValid,
  validatedBody(contactUpdate),
  checkIdContactExists,
  checkEmailExists,
  checkNameExists,
  updateContactController
);
contactRoutes.delete(
  "/:id",
  tokenValid,
  checkIdContactExists,
  deleteContactController
);

export { contactRoutes };
