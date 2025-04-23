const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/user_Controller");
const validate = require("../../validates/client/user_Validates");

router.get("/register", controllers.register);

router.post("/register", validate.postRegister, controllers.postRegister);

router.get("/login", controllers.login);

router.post("/login", validate.loginPost, controllers.loginPost);

module.exports = router;
