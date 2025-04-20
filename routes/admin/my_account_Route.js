const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/my_account");

//home route
router.get("/", controllers.index);

module.exports = router;
