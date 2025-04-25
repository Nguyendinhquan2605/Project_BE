const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/user_Controller");
const validate = require("../../validates/client/user_Validates");

router.get("/register", controllers.register);

router.post("/register", validate.postRegister, controllers.postRegister);

router.get("/login", controllers.login);

router.post("/login", validate.loginPost, controllers.loginPost);

router.get("/logout", controllers.logout);

router.get("/password/forgot", controllers.forgotPassword);

router.post(
  "/password/forgot",
  validate.forgotPassword,
  controllers.forgotPasswordPost
);

router.get("/password/otp", controllers.otpPassword);

router.post("/password/otp", controllers.otpPasswordPost);

router.get("/password/reset", controllers.resetPassword);

router.post(
  "/password/reset",
  validate.resetPassword,
  controllers.resetPasswordPost
);

module.exports = router;
