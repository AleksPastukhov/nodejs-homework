const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const signupService = async (body) => {
  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    throw new HttpError(409, "Email should be unique");
  }
  return await User.create(body);
};

const loginService = async (body) => {
  const { email, password } = body;
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, currentUser.password);
  if (!passwordCompare) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: currentUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(currentUser._id, { token });

  return {
    token,
    user: {
      email: currentUser.email,
      subscription: currentUser.subscription,
    },
  };
};

const logoutService = async (user) => {
  const { _id } = user;
  const currentUser = await User.findByIdAndUpdate(_id, { token: "" });
  if (!currentUser) {
    throw new HttpError(401, "Not authorized");
  }
};

const changeUserSubscription = async (req) => {
  const user = req.user;
  const { subscription } = req.body;

  return User.findByIdAndUpdate(user._id, { subscription }, { new: true });
};

const updateAvatarService = async (userId, file) => {
  const { path: tmpUpload, originalname } = file;
  const extension = originalname.split(".").pop();

  const image = await Jimp.read(`tmp/${originalname}`);
  image.resize(250, 250);

  const filename = `${userId}.${extension}`;
  const uploadFullPath = path.join(avatarDir, filename);

  fs.rename(tmpUpload, uploadFullPath);
  const avatarURL = path.join("avatars", filename);

  return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
};

module.exports = {
  signupService,
  loginService,
  logoutService,
  changeUserSubscription,
  updateAvatarService,
};
