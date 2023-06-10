const { HttpError } = require("../utils/HttpError");
const { User } = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PUBLIC_URL, LOCAL_URL } = process.env;

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const gravatar = require("gravatar");
const sendEmail = require("../utils/sendEmail");

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const signupService = async (body) => {
  const currentUser = await User.findOne({ email: body.email });
  if (currentUser) {
    throw new HttpError(409, "Email should be unique");
  }
  const avatarURL = gravatar.url(body.email);
  const verificationToken = uuidv4();
  const verifyEmail = {
    to: body.email,
    subject: "Email verification from Contacts",
    html: `<strong>Please verify your email by clicking this <a target="_blank" href="${LOCAL_URL}auth/verify/${verificationToken}">verification link</a></strong>`,
  };
  await sendEmail(verifyEmail);

  return await User.create({
    ...body,
    avatarURL,
    verificationToken: verificationToken,
  });
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
    user: currentUser
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

const verifyEmailService = async (token) => {
  console.log(token)
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  return User.findByIdAndUpdate(
    user._id,
    {
      verify: true,
      verificationToken: null,
    },
    { new: true }
  );
};

const resentVerifyEmailService = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: user.email,
    subject: "Email verification from Contacts",
    html: `<strong>Please verify your email by clicking this <a target="_blank" href="${LOCAL_URL}auth/verify/${user.verificationToken}">verification link</a></strong>`,
  };

  await sendEmail(verifyEmail);
};

module.exports = {
  signupService,
  loginService,
  logoutService,
  changeUserSubscription,
  updateAvatarService,
  verifyEmailService,
  resentVerifyEmailService,
};
