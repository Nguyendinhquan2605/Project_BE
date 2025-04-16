const express = require("express");
const router = express.Router();
const productControllers = require("../../controllers/client/productController");

router.get("/", productControllers.index);

router.get("/detail/:slugProduct", productControllers.detail);

router.get("/:slugCategory", productControllers.category);

module.exports = router;
