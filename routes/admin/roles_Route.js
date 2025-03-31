const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/Roles_Controllers");

//home route
router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post("/create", controllers.createPost);

module.exports = router;
