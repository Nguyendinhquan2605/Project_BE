const ProductsCategory = require("../../models/productsCategory_model");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  let count = 0;
  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        count++;
        const newItem = item;
        newItem.index = count;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });

    return tree;
  }

  const records = await ProductsCategory.find(find);
  const newRecords = createTree(records);
  console.log(records);

  res.render("admin/page/products_category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  function createTree(arr, parentId = "") {
    const tree = [];

    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        const newItem = item;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });

    return tree;
  }

  const records = await ProductsCategory.find(find);
  const newRecords = createTree(records);
  console.log(records);

  res.render("admin/page/products_category/create.pug", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
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
