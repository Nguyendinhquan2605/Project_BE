const Product = require("../../models/products_models");

module.exports.index = async (req, res) => {
  const product = await Product.find({
    availabilityStatus: "In Stock",
  });

  product.forEach((items) => {
    items.priceNew =
      (items.price * (100 - items.discountPercentage)).toFixed(0) / 100;
  });

  console.log(">>>check product: ", product);

  res.render("client/page/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: product,
  });
};

module.exports.edit = (req, res) => {
  res.send("Ok edit");
};
