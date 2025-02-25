const productRoutes = require("./products_router");
const homeRoutes = require("./home_router");

module.exports = (app) => {
  app.use("/", homeRoutes);

  app.use("/products", productRoutes);
};
