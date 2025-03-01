const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/dashboardController");

//home route
router.get("/", controllers.dashboard);

module.exports = router;
