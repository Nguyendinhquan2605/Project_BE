const Product = require("../../models/products_models");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const product = await Product.find({});

  console.log(">>>check product: ", product);

  res.render("admin/page/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    Products: product,
  });
};
