const Cart = require("../../models/carts_model");
const Product = require("../../models/products_models");
const productsHelper = require("../../helper/products");

//[GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.products_id;

      const productInfo = await Product.findOne({
        _id: productId,
      });

      productInfo.priceNew = productsHelper.PriceNew_Product(productInfo);

      item.productInfo = productInfo;

      item.totalPrice = item.quantity * productInfo.priceNew;
    }
  }

  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  res.render("client/page/checkout/index", {
    pageTitle: "Trang đặt hàng",
    cartDetail: cart,
  });
};
