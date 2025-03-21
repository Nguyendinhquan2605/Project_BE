const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/productsController");
const storageMulter = require("../../helper/storageMulter");
const validates = require("../../validates/admin/products_Validates");
const multer = require("multer");
const upload = multer({ storage: storageMulter() });

//home route
router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create", controllers.createItem);

router.post(
  "/create",
  upload.single("thumbnail"),
  validates.createPost,
  controllers.createPosst
);

router.get("/edit/:id", controllers.edit);

router.post(
  "/edit/:id",
  upload.single("thumbnail"),
  validates.createPost,
  controllers.editProduct
);

router.get("/detail/:id", controllers.detail);

module.exports = router;
