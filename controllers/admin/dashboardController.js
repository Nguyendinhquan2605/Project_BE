const Product = require("../../models/products_models");
const User = require("../../models/user_model");
const Account = require("../../models/account_model");
const Product_Category = require("../../models/productsCategory_model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };

  statistic.categoryProduct.total = await Product_Category.countDocuments({
    deleted: false,
  });

  statistic.categoryProduct.active = await Product_Category.countDocuments({
    status: "active",
    deleted: false,
  });

  statistic.categoryProduct.inactive = await Product_Category.countDocuments({
    status: "inactive",
    deleted: false,
  });

  //Products
  statistic.product.total = await Product.countDocuments({
    deleted: false,
  });

  statistic.product.active = await Product.countDocuments({
    status: "active",
    deleted: false,
  });

  statistic.product.inactive = await Product.countDocuments({
    status: "inactive",
    deleted: false,
  });

  //Account
  statistic.account.total = await Account.countDocuments({
    deleted: false,
  });

  statistic.account.active = await Account.countDocuments({
    status: "active",
    deleted: false,
  });

  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false,
  });

  //User
  statistic.user.total = await User.countDocuments({
    deleted: false,
  });

  statistic.user.active = await User.countDocuments({
    status: "active",
    deleted: false,
  });

  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    deleted: false,
  });

  res.render("admin/page/dashboard/index.pug", {
    pageTitle: "Trang admin",
    statistic: statistic,
  });
};
