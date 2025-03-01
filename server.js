const express = require("express");
const mongoose = require("mongoose");
const connection = require("./config/database");
const routerClient = require("./routes/client/index_Routes"); //router client
const routerAdmin = require("./routes/admin/indexRoute"); //router admin
require("dotenv").config();

const systemConfig = require("./config/system");

const hostname = "localhost";
const app = express();
const port = process.env.PORT;

// const Products = mongoose.model("Product", {
//   title: String,
//   description: String,
//   price: Number,
//   discoutPercentage: Number,
//   stock: Number,
//   thumbnail: String,
//   status: String,
//   position: Number,
//   deleted: Boolean,
// });

//views
app.set("views", "./views");
app.set("view engine", "pug");

//App locals Variables
// app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Router
routerClient(app);
routerAdmin(app);

//config static file
app.use(express.static("public"));

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
