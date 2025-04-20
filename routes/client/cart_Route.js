const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/cart_Controller");

//home route
router.post("/add/:productId", controllers.addPost);

router.get("/", controllers.index);

router.get("/delete/:productId", controllers.delete);

module.exports = router;
