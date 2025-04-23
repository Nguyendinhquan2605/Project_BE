const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/user_Controller");
const validate = require("../../validates/client/user_Validates");

router.get("/register", controllers.register);

router.post("/register", validate.postRegister, controllers.postRegister);

module.exports = router;
