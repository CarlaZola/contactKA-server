import { Request, Response } from "express";
import { createContactService } from "../../services/contacts/createContact.service";
import { updateContactService } from "../../services/contacts/updateContact.service";
import { readAllContactService } from "../../services/contacts/readAllContacts.service";
import { deleteContactService } from "../../services/contacts/deleteContact.service";
import { contactService } from "../../services/contacts/readContact.service";

const createContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newContact = await createContactService(req.body);

  return res.status(201).json(newContact);
};

const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const updatedContat = await updateContactService(req.body, id);

  return res.json(updatedContat);
};

const readAllContactsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const contacts = await readAllContactService(id);

  return res.json(contacts);
};

const readContact = async (req: Request, res: Response): Promise<Response> => {
  const { idUser } = res.locals.token;

  const contacts = await contactService(idUser);

  return res.json(contacts);
};

const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  await deleteContactService(id);

  return res.status(204).send();
};

export {
  createContactController,
  updateContactController,
  readAllContactsController,
  deleteContactController,
  readContact,
};
