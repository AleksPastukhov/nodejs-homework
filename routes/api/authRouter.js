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
  updateAvatar,
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

module.exports = {
  authRouter: router,
};
