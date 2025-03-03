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
    filterStatus[0].class = "active";
  }

  const find = {};
  if (req.query.status) {
    find.status = req.query.status;
  }

  // console.log(">>>check find: ", req.query);

  const product = await Product.find(find);

  // console.log(">>>check product: ", product);

  res.render("admin/page/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    Products: product,
    filterStatus: filterStatus,
  });
};
