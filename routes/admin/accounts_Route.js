const express = require("express");
const router = express.Router();

const Account_Controllers = require("../../controllers/admin/accounts_Controllers");
const multer = require("multer");
const validates = require("../../validates/admin/accounts_Validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud_Mdw");
const upload = multer();

//home route
router.get("/", Account_Controllers.index);

router.get("/create", Account_Controllers.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validates.createPost,
  Account_Controllers.createPost
);

module.exports = router;
