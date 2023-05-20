const { HttpError } = require("../utils/HttpError");
const { Contact } = require("../models/contacts");

const getContactsService = async () => {
  return await Contact.find();
};

const getContactService = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new HttpError(404, "Contact is not found");
  }
  return contact;
};

const createContactService = async (data) => {
  return await Contact.create(data);
};

const updateContactService = async (id, data) => {
  const editedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!editedContact) {
    throw new HttpError(404, "Contact is not found");
  }
  return editedContact;
};

const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new HttpError(404, "Contact is not found");
  }
  return contact;
};

module.exports = {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
};
