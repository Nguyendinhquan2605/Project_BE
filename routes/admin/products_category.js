const express = require("express");
const router = express.Router();
const multer = require("multer");
const validates = require("../../validates/admin/products_category");
const controllers = require("../../controllers/admin/products_category");
const uploadCloud = require("../../middlewares/admin/uploadCloud_Mdw");
const upload = multer();

//home route
router.get("/", controllers.index);

router.get("/create", controllers.create);

router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validates.createPost,
  controllers.createPost
);

module.exports = router;
