const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("client/page/products/index.pug");
});

router.get("/edit", async (req, res) => {
  res.send("Edit Products");
});

module.exports = router;
