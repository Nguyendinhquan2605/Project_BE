const mongoose = require("mongoose");
const generate = require("../helper/generate");

const forgotPasswordsSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 180,
    },
  },
  {
    timestamps: true,
  }
);

// Override all methods

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordsSchema,
  "forgot-password"
);

module.exports = ForgotPassword;
