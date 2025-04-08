const dashboardRoute = require("./dashboardRoute");
const productRoute = require("./productsRoute");
const products_Category_Route = require("./products_category");
const roles_Route = require("./roles_Route");
const Account_Rote = require("./accounts_Route");
const Auth_Route = require("./auth_Route");

const middleware_Auth = require("../../middlewares/admin/auth_Middleware");

module.exports = (app) => {
  app.use("/admin/dashboard", middleware_Auth.requireAuth, dashboardRoute);

  app.use("/admin/products", middleware_Auth.requireAuth, productRoute);

  app.use(
    "/admin/products-category",
    middleware_Auth.requireAuth,
    products_Category_Route
  );

  app.use("/admin/roles", middleware_Auth.requireAuth, roles_Route);

  app.use("/admin/accounts", middleware_Auth.requireAuth, Account_Rote);

  app.use("/admin/auth", Auth_Route);
};
