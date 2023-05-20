const express = require("express");

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers/contactsControllers");
const router = express.Router();
const { validateBody } = require("../../utils/validateBody");
const {
  createValidateSchema,
  updateValidateSchema,
  schemaForUpdateFavorite,
} = require("../../utils/validation/contactValidationsSchemas");

router
  .route("/")
  .get(getContacts)
  .post(validateBody(createValidateSchema), createContact);
router
  .route("/:contactId")
  .get(getContact)
  .put(validateBody(updateValidateSchema), updateContact)
  .delete(deleteContact);

router
  .route("/:contactId/favorite")
  .patch(validateBody(schemaForUpdateFavorite), updateStatusContact);

module.exports = {
  contactsRouter: router,
};
