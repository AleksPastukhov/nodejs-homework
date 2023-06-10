const express = require("express");
const {
  createUserValidationSchema,
  loginValidationSchema,
  updateSubscriptionSchema,
  verifyEmailSchema,
  authControll,
} = require("../../utils/validation/authValidationSchema");
const { validateBody } = require("../../utils/validateBody");
const {
  signup,
  login,
  logout,
  getUser,
  updateUserSubscriprion,
  updateAvatar,
  verifyEmail,
  resentVerifyEmail,
} = require("../../controllers/authControllers");
const upload = require("../../middlewares/upload");

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

router.patch("/avatars", authControll, upload.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", verifyEmail);

router.post(
  "/verify",
  validateBody(verifyEmailSchema),
  resentVerifyEmail
);

module.exports = {
  authRouter: router,
};
