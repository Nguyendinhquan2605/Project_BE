const express = require("express");
const mongoose = require("mongoose");
const connection = require("./config/database");
const router = require("./routes/client/index_Routes");

const hostname = 3301;
const app = express();
const port = 3001;

//views
app.set("views", "./views");
app.set("view engine", "pug");

const Products = mongoose.model("Product", {
  title: String,
  price: Number,
  thumbnail: String,
});

// Router
router(app);

//config view
// app.use(express.static("public"));

(async () => {
  //test connection

  await connection();
  app.listen(port, hostname, () => {
    console.log(`Backend zero app listening on port ${port}`);
  });
})();

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
