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
  // console.log(records);

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
  // console.log(records);

  res.render("admin/page/products_category/create.pug", {
    pageTitle: "Tạo danh mục sản phẩm",
    records: newRecords,
  });
};

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {
  // console.log(req.body);

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

// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  // console.log(req.params.id);
  try {
    const data = await ProductsCategory.findOne({
      deleted: false,
      _id: req.params.id,
    });

    const records = await ProductsCategory.find({
      deleted: false,
    });

    // console.log(">>>check records", records);

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

    const newRecords = createTree(records);

    res.render("admin/page/products_category/edit.pug", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect("/admin/products-category");
  }
};

// [PATH] /admin/products-category/edit/:id
module.exports.editProduct_category = async (req, res) => {
  console.log(req.params.id);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  try {
    await ProductsCategory.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công !");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("/admin/products-category");
};

// [GET] /admin/products-categpry/detail/:id
module.exports.detail = async (req, res) => {
  // console.log(req.params.id);
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const data = await ProductsCategory.findOne(find);
    // console.log(product);

    res.render("admin/page/products_category/detail.pug", {
      pageTitle: ProductsCategory.title,
      data: data,
    });
  } catch (error) {
    res.redirect("/admin/products-category");
  }
};
