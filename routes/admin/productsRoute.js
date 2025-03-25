const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/productsController");
const multer = require("multer");
// const storageMulter = require("../../helper/storageMulter");
const validates = require("../../validates/admin/products_Validates");
const uploadCloud = require("../../middlewares/admin/uploadCloud_Mdw");
const upload = multer();

//home route
router.get("/", controllers.index);

router.patch("/change-status/:status/:id", controllers.changeStatus);

router.patch("/change-multi", controllers.changeMulti);

router.delete("/delete/:id", controllers.deleteItem);

router.get("/create", controllers.createItem);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createPost,
  controllers.createPosst
);

router.get("/edit/:id", controllers.edit);

router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createPost,
  controllers.editProduct
);

router.get("/detail/:id", controllers.detail);

module.exports = router;
