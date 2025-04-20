const Cart = require("../../models/carts_model");
const Product = require("../../models/products_models");
const productsHelper = require("../../helper/products");

// [POST]/cart/add/:productId
module.exports.addPost = async (req, res) => {
  const cartId = req.cookies.cartId;

  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const existProductInCart = cart.products.find(
    (item) => item.products_id == productId
  );

  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;

    await Cart.updateOne(
      {
        _id: cartId,
        "products.products_id": productId,
      },
      {
        "products.$.quantity": newQuantity,
      }
    );
  } else {
    const objectCart = {
      products_id: productId,
      quantity: quantity,
    };

    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $push: { products: objectCart },
      }
    );
  }

  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
  res.redirect("back");
};

//[GET] /cart/
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

  res.render("client/page/cart/index.pug", {
    pageTitle: "Trang giỏ hàng",
    cartDetail: cart,
  });
};

//[GET] /cart/delete/productId
module.exports.delete = async (req, res) => {
  const productId = req.params.productId;

  const cartId = req.cookies.cartId;

  await Cart.updateOne(
    { _id: cartId },
    { $pull: { products: { products_id: productId } } }
  );

  req.flash("success", "Xóa thành công!");
  res.redirect("back");
};
