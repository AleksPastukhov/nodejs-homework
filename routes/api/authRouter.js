const express = require("express");
const {
  createUserValidationSchema,
  loginValidationSchema,
} = require("../../utils/validation/authValidationSchema");
const { validateBody } = require("../../utils/validateBody");
const { signup, login, logout } = require("../../controllers/authControllers");

const router = express.Router();
router.post("/signup", validateBody(createUserValidationSchema), signup);
router.post("/login", validateBody(loginValidationSchema), login);
router.post("/logout", logout);

module.exports = {
  authRouter: router,
};
