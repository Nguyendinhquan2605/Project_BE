const Product = require("../../models/products_models");

module.exports.index = async (req, res) => {
  const product = await Product.find({
    // status: "inactive",
    deleted: "true",
  });
  console.log(">>>check product: ", product);

  res.render("client/page/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
  });
};

module.exports.edit = (req, res) => {
  res.send("Ok edit");
};
