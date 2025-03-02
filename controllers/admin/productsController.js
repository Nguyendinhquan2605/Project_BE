const Product = require("../../models/products_models");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  const find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }

  console.log(">>>check find: ", req.query);

  const product = await Product.find(find);

  // console.log(">>>check product: ", product);

  res.render("admin/page/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    Products: product,
  });
};
