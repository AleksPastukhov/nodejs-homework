const {
  getContactsService,
  getContactService,
  createContactService,
  updateContactService,
  deleteContactService,
} = require("../services/contactsServices");
const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");

const getContacts = catchAsyncWrapper(async (req, res, next) => {
  const { page = 1, limit = 10, favorite } = req.query;
  const contacts = await getContactsService(page, limit, favorite);
  res.status(200).json(contacts);
});

const getContact = catchAsyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactService(contactId);
  res.status(200).json(contact);
});

const createContact = catchAsyncWrapper(async (req, res, next) => {
  const newContact = await createContactService(req.body);
  res.status(201).json(newContact);
});

const updateContact = catchAsyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactService(contactId, req.body);
  res.status(200).json(updatedContact);
});

const deleteContact = catchAsyncWrapper(async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactService(contactId);
  res.status(200).json(deletedContact);
});

const updateStatusContact = catchAsyncWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateContactService(contactId, req.body);
  res.status(200).json(updatedContact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
};
