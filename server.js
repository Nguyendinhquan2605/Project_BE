const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connection = require("./config/database");
const routerClient = require("./routes/client/index_Routes"); //router client
const routerAdmin = require("./routes/admin/indexRoute"); //router admin
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("express-flash");
require("dotenv").config();

const systemConfig = require("./config/system");

const hostname = "localhost";
const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

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

//Method-Override
app.use(methodOverride("_method"));

//views
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

//Flash
app.use(cookieParser("keyboard cat"));
app.use(expressSession({ cookie: { maxAge: 60000 } }));
app.use(flash());
//End Flash

// Tiny-MCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Router
routerClient(app);
routerAdmin(app);

//config static file
app.use(express.static(`${__dirname}/public`));

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
