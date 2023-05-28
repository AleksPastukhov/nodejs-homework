const { HttpError } = require("../HttpError");
const { SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../../models/User");
const Joi = require("joi");

const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const createUserValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(passwordPattern).required().messages({
    "sting.pattern.base":
      "Password should contain minimum eight characters, at least one letter and one number",
  }),
});

const loginValidationSchema = Joi.object().keys({
  email: createUserValidationSchema.extract("email"),
  password: createUserValidationSchema.extract("password"),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.boolean()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "Subscription is a required field",
    }),
});

const authControll = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(new HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (user === null || user.token === null || user.token !== token) {
      next(new HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(new HttpError(401, "Not authorized"));
  }
};

module.exports = {
  createUserValidationSchema,
  loginValidationSchema,
  authControll,
  updateSubscriptionSchema,
};
