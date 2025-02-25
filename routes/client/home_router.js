const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("client/page/home/index.pug");
});

router.get("/abc", async (req, res) => {
  res.send("ok abc");
});

module.exports = router;
