const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const {
  signupService,
  loginService,
  logoutService,
  changeUserSubscription,
  updateAvatarService,
  verifyEmailService,
  resentVerifyEmailService,
} = require("../services/authServices");

const signup = catchAsyncWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
});

const login = catchAsyncWrapper(async (req, res, next) => {
  const {user, token} = await loginService(req.body);
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

const logout = catchAsyncWrapper(async (req, res, next) => {
  await logoutService(req.user);
  res.status(200).json({ message: "No Content" });
});

const getUser = catchAsyncWrapper(async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
});

const updateUserSubscriprion = catchAsyncWrapper(async (req, res, next) => {
  const updatedUser = await changeUserSubscription(req);

  res.status(201).json({
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
});

const updateAvatar = catchAsyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const updatedUser = await updateAvatarService(id, req.file);

  res.status(200).json({
    avatarURL: updatedUser.avatarURL,
  });
});

const verifyEmail = catchAsyncWrapper(async (req, res, next) => {
  const { verificationToken } = req.params;

  await verifyEmailService(verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

const resentVerifyEmail = catchAsyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  await resentVerifyEmailService(email);

  res.status(200).json({ message: "Verification email sent" });
});

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserSubscriprion,
  updateAvatar,
  verifyEmail,
  resentVerifyEmail,
};
