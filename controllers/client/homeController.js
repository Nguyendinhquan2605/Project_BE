const Product = require("../../models/products_models");
const products_helper = require("../../helper/products");

module.exports.index = async (req, res) => {
  // console.log(">>>check: ", newProductCategory);
  const products_Prominent = await Product.find({
    deleted: false,
    featured: "1",
    status: "active",
  }).limit(4);

  // console.log(">>>check products_Prominent: ", products_Prominent);
  const newProducts = products_helper.PriceNew_Products(products_Prominent);

  res.render("client/page/home/index.pug", {
    pageTitle: "Trang chủ",
    products_Featured: newProducts,
  });
};
