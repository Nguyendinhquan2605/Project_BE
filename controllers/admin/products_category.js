const ProductsCategory = require("../../models/productsCategory_model");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await ProductsCategory.find(find);

  res.render("admin/page/products_category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: records,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  res.render("admin/page/products_category/create.pug", {
    pageTitle: "Tạo danh mục sản phẩm",
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  console.log(req.body);

  if (req.body.position == "") {
    const countPosition = await ProductsCategory.countDocuments();
    req.body.position = countPosition + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const productCategory = new ProductsCategory(req.body);
  await productCategory.save();

  res.redirect("/admin/products-category");
};
