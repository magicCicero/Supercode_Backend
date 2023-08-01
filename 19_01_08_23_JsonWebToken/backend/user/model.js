import { Schema, model } from "mongoose";
import crypto from "crypto";

export const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  salt: { type: String, required: true, select: false },
  hash: { type: String, required: true, select: false },
});

userSchema.methods.setPassword = function (password) {
  // Salt
  this.salt = crypto.randomBytes(64).toString("hex");
  //   Password mit salt hashen
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

export const User = model("User", userSchema);

export default User;
