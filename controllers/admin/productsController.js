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
    .skip(objectPagination.skip);

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
  res.redirect("back");
};

// [PATH] /admin/products/change-multi/
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");

  await Product.updateMany({ _id: { $in: ids } }, { status: type });
  console.log(req.body);
  res.redirect("back");
};

// // [DELETE] /admin/products/delete/:id
// module.exports.deleteItem = async (req, res) => {
//   console.log(req.params);
//   const id = req.params.id;

//   await Product.deleteOne({ _id: id });
//   res.redirect("back");
// };

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
  res.redirect("back");
};
