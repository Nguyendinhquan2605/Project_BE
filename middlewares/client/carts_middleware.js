const Cart = require("../../models/carts_model");

module.exports.cardId = async (req, res, next) => {
  const url = req.originalUrl;
  const extPattern = /\.(css|js|png|jpg|jpeg|gif|svg|webp|ico)$/i;

  // ⚠️ Bỏ qua nếu là request static file hoặc đường dẫn /upload
  if (url.startsWith("/upload") || extPattern.test(url)) {
    return next();
  }

  // 👉 In log nếu là request "trang chính"
  // console.log("Đã vào middleware cartId:", url);

  // console.log(">>>check: ", req.cookies.cartId);

  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    // console.log(cart);
    const expiresTime = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresTime),
    });
  } else {
    //khi da co gio hang
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });

    cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    // console.log(cart);
    res.locals.miniCart = cart;
  }

  next();
};
