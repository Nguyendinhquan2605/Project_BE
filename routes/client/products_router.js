const express = require("express");
const router = express.Router();
const productControllers = require("../../controllers/client/productController");

router.get("/", productControllers.index);

router.get("/:slug", productControllers.detail);

router.get("/edit", productControllers.edit);

module.exports = router;
