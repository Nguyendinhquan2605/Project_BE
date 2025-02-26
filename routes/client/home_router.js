const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/client/homeController");

//home route
router.get("/", controllers.index);

router.get("/abc", async (req, res) => {
  res.send("ok abc");
});

module.exports = router;
