const dashboardRoute = require("./dashboardRoute");
const productRoute = require("./productsRoute");
const products_Category_Route = require("./products_category");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);

  app.use("/admin/products", productRoute);

  app.use("/admin/products-category", products_Category_Route);
};
