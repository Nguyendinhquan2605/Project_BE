const dashboardRoute = require("./dashboardRoute");
const productRoute = require("./productsRoute");
const products_Category_Route = require("./products_category");
const roles_Route = require("./roles_Route");
const Account_Rote = require("./accounts_Route");

module.exports = (app) => {
  app.use("/admin/dashboard", dashboardRoute);

  app.use("/admin/products", productRoute);

  app.use("/admin/products-category", products_Category_Route);

  app.use("/admin/roles", roles_Route);

  app.use("/admin/accounts", Account_Rote);
};
