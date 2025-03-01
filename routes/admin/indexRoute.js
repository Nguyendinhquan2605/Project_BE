const dashboardRoute = require("./dashboardRoute");
const productRoute = require("./productsRoute");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);

  app.use("/admin/products", productRoute);
};
