const productRoutes = require("./products_router");
const homeRoutes = require("./home_router");
const category_middleware = require("../../middlewares/client/category_middleware");
const search_Routes = require("./search_route");

module.exports = (app) => {
  app.use(category_middleware.category);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", search_Routes);
};
