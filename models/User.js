const { Schema, model } = require("mongoose");
const handleMongooseSchemaError = require("../utils/handleMongooseSchemaErr");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: String,
  token: String,
  refresh_token: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.post("save", handleMongooseSchemaError);

const User = model("user", userSchema);

module.exports = {
  User,
};
