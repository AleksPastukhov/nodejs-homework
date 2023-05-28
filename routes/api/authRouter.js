const express = require("express");
const {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
  authControll,
} = require("../../utils/validation/authValidationSchema");
const { validateBody } = require("../../utils/validateBody");
const {
  signup,
  login,
  logout,
  getUser,
  updateUserSubscriprion,
} = require("../../controllers/authControllers");

const router = express.Router();
router.post("/signup", validateBody(createUserValidationSchema), signup);
router.post("/login", validateBody(loginValidationSchema), login);
router.route("/logout").post(authControll, logout);
router.route("/current").get(authControll, getUser);

router
  .route("/current/subscription")
  .patch(
    authControll,
    validateBody(updateSubscriptionSchema),
    updateUserSubscriprion
  );

module.exports = {
  authRouter: router,
};
