const Cart = require("../../models/carts_model");

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

  //   req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
  res.redirect("back");
};
