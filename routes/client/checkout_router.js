const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/Checkout_Controller");

//home route
router.get("/", controllers.index);

module.exports = router;
