const Product = require("../../models/products_models");
const products_helper = require("../../helper/products");
const ProductsCategory = require("../../models/productsCategory_model");
const products_category_Helper = require("../../helper/products_category");

// [GET] /products
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

// [GET] /products/:slug
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

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  // console.log(req.params.slugCategory);

  try {
    const category = await ProductsCategory.findOne({
      slug: req.params.slugCategory,
      status: "active",
      deleted: false,
    });

    // console.log(category.id);

    const listSubCategory = await products_category_Helper.getSubCategory(
      category.id
    );

    const listSubCategory_Id = listSubCategory.map((item) => item.id);

    const product = await Product.find({
      products_category_id: { $in: [category.id, ...listSubCategory_Id] },
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = products_helper.PriceNew_Products(product);

    // console.log(product);

    res.render("client/page/products/index.pug", {
      pageTitle: category.title,
      products: newProducts,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
