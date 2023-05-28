const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const {
  signupService,
  loginService,
  logoutService,
  changeUserSubscription,
} = require("../services/authServices");

const signup = catchAsyncWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const login = catchAsyncWrapper(async (req, res, next) => {
  const currentUser = await loginService(req.body);
  res.status(200).json(currentUser);
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

module.exports = {
  signup,
  login,
  logout,
  getUser,
  updateUserSubscriprion,
};
