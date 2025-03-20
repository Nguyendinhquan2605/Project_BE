const Product = require("../../models/products_models");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  const filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(
      (item) => item.status == req.query.status
    );
    // console.log(index);
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((item) => item.status == "");
    filterStatus[index].class = "active";
  }

  const find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }

  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    find.title = keyword;

    const regex = new RegExp(keyword, "i");
    find.title = regex;
  }

  // Pagination
  let objectPagination = {
    currentPage: 1,
    limitItems: 4,
  };

  if (req.query.page) {
    objectPagination.currentPage = parseInt(req.query.page);
  }

  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  const countProducts = await Product.countDocuments(find);
  // console.log(countProducts);
  const totalsPage = Math.ceil(countProducts / objectPagination.limitItems);
  // console.log(totalsPage);
  objectPagination.totalsPage = totalsPage;

  // console.log(">>>check find: ", req.query);
  const product = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort({ position: "desc" });

  // console.log(">>>check product: ", product);

  res.render("admin/page/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    Products: product,
    filterStatus: filterStatus,
    keyword: keyword,
    pagination: objectPagination,
  });
};

// [PATH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái thành công!");

  res.redirect("back");
};

// [PATH] /admin/products/change-multi/
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công của ${ids.length} sản phẩm!`
      );
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Cập nhật trạng thái thành công của ${ids.length} sản phẩm!`
      );
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deleteAt: new Date() }
      );
      req.flash("success", `Xóa thành công của ${ids.length} sản phẩm!`);
      break;
    case "change-position":
      // console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);
        await Product.updateMany({ _id: id }, { position: position });
      }
      // await Product.updateMany(
      //   { _id: { $in: ids } },
      //   { deleted: true, deleteAt: new Date() }
      // );
      req.flash(
        "success",
        `Thay đổi vị trí thành công ${ids.length} sản phẩm !`
      );
      break;
    default:
      break;
  }
  // console.log(req.body);
  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deleteAt: new Date(),
    }
  );
  req.flash("success", "Xóa thành công 1 sản phẩm!");

  res.redirect("back");
};

// [POST] /admin/products/create
module.exports.createItem = async (req, res) => {
  res.render("admin/page/products/create.pug", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] /admin/products/create
module.exports.createPosst = async (req, res) => {
  // console.log(req.file);
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countPosition = await Product.countDocuments();
    req.body.position = countPosition + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  console.log(req.body);
  const product = new Product(req.body);
  await product.save();

  res.redirect("/admin/products");
};

// [POST] /admin/products/edit
module.exports.edit = async (req, res) => {
  console.log(req.params.id);

  const find = {
    deleted: false,
    _id: req.params.id,
  };

  const product = await Product.findOne(find);
  console.log(product);

  res.render("admin/page/products/edit.pug", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
  });
};

// [PATH] /admin/products/edit
module.exports.editProduct = async (req, res) => {
  console.log(req.params.id);
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/upload/${req.file.filename}`;
  }

  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công !");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("/admin/products");
};
