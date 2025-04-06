const express = require("express");
const router = express.Router();
const Auth_Controllers = require("../../controllers/admin/auth_Controllers");
const validates = require("../../validates/admin/auth_validate");

//home route
router.get("/login", Auth_Controllers.login);

router.post("/login", validates.login, Auth_Controllers.loginPost);

module.exports = router;
