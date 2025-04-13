const productRoutes = require("./products_router");
const homeRoutes = require("./home_router");
const category_middleware = require("../../middlewares/client/category_middleware");

module.exports = (app) => {
  app.use(category_middleware.category);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);
};
