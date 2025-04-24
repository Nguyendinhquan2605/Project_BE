const category_middleware = require("../../middlewares/client/category_middleware");
const cardMiddleware = require("../../middlewares/client/carts_middleware");
const userMiddleware = require("../../middlewares/client/user_middleware");

const homeRoutes = require("./home_router");
const productRoutes = require("./products_router");
const search_Routes = require("./search_route");
const cart_Route = require("./cart_Route");
const checkout_Routes = require("./checkout_router");
const User_Routes = require("./user_router");

module.exports = (app) => {
  app.use(category_middleware.category);

  app.use(cardMiddleware.cardId);

  app.use(userMiddleware.infoUser);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", search_Routes);

  app.use("/cart", cart_Route);

  app.use("/checkout", checkout_Routes);

  app.use("/user", User_Routes);
};
