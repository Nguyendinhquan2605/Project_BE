const Product = require("../../models/products_models");
const products_helper = require("../../helper/products");

module.exports.index = async (req, res) => {
  const product = await Product.find({
    status: "active",
  }).sort({ position: "desc" });

  const newProducts = products_helper.PriceNew_Products(product);

  // console.log(">>>check product: ", product);

  res.render("client/page/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: newProducts,
  });
};

module.exports.detail = async (req, res) => {
  // console.log(req.params.slug);

  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active",
    };

    const product = await Product.findOne(find);
    console.log(product);

    res.render("client/page/products/detail.pug", {
      pageTitle: product.slug,
      product: product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};

module.exports.edit = (req, res) => {
  res.send("Ok edit");
};
