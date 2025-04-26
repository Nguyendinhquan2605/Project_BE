const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/admin/Setting_Controller");
const multer = require("multer");
const uploadCloud = require("../../middlewares/admin/uploadCloud_Mdw");
const upload = multer();

//home route
router.get("/general", controllers.general);

router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  controllers.generalPatch
);

module.exports = router;
