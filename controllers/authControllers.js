const { catchAsyncWrapper } = require("../utils/catchAsyncWrapper");
const {
  signupService,
  // loginService,
  // logoutService,
} = require("../services/authServices");

const signup = catchAsyncWrapper(async (req, res, next) => {
  const newUser = await signupService(req.body);
  res.status(201).json(newUser);
});

const login = catchAsyncWrapper((req, res, next) => {});

const logout = catchAsyncWrapper((req, res, next) => {});

module.exports = {
  signup,
  login,
  logout,
};
