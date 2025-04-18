const Products = require("../../models/products_models");
const products_helper = require("../../helper/products");

// [GET] /search
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newProducts = [];

  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const products = await Products.find({
      title: keywordRegex,
      status: "active",
      deleted: false,
    });

    newProducts = products_helper.PriceNew_Products(products);

    // console.log(newProducts);
  }

  res.render("client/page/search/index.pug", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProducts,
  });
};
