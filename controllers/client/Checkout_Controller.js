const Order = require("../../models/orders_model");
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

//[POST] /checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const fullName = req.body.fullName;
  const phone = req.body.phone;
  const address = req.body.address;
  const userInfor = {
    fullName: req.body.fullName,
    phone: req.body.phone,
    address: req.body.address,
  };
  const cart = await Cart.findOne({
    _id: cartId,
  });

  let products = [];

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.products_id;

      const productInfo = await Product.findOne({
        _id: productId,
      });

      const price = productInfo.price;
      const discountPercentage = productInfo.discountPercentage;
      const quantity = parseInt(item.quantity);

      const objectProducts = {
        product_id: productId,
        price: price,
        discountPercentage: discountPercentage,
        quantity: quantity,
      };
      products.push(objectProducts);
    }
  }

  const objectOrder = {
    cart_id: cartId,
    userInfor: userInfor,
    products: products,
  };

  const order = new Order(objectOrder);
  await order.save();

  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    }
  );

  res.redirect(`/checkout/success/${order.id}`);
};
