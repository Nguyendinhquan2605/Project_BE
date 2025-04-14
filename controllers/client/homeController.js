const Product = require("../../models/products_models");
const products_helper = require("../../helper/products");

module.exports.index = async (req, res) => {
  //Lay ra an pham not bat
  const products_Prominent = await Product.find({
    deleted: false,
    featured: "1",
    status: "active",
  }).limit(4);

  const newProducts_Featured =
    products_helper.PriceNew_Products(products_Prominent);
  //Lay ra an pham not bat

  //Lay ra san pham moi nhat
  const Products_new = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);

  const newProducts_new = products_helper.PriceNew_Products(Products_new);
  //Lay ra san pham moi nhat

  res.render("client/page/home/index.pug", {
    pageTitle: "Trang chủ",
    products_Featured: newProducts_Featured,
    products_new: newProducts_new,
  });
};
