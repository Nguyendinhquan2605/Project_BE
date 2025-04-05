const md5 = require("md5");
const Accounts = require("../../models/account_model");
const Roles = require("../../models/roles_Model");

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Accounts.find(find).select("-password -token");
  for (const record of records) {
    const role = await Roles.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
    // console.log("check record: ", record.role);
  }

  res.render("admin/page/accounts/index.pug", {
    pageTitle: "Trang danh sách tài khoản",
    records: records,
  });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Roles.find({
    deleted: false,
  });
  res.render("admin/page/accounts/create.pug", {
    pageTitle: "Trang tạo mới tài khoản",
    roles: roles,
  });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExist = await Accounts.findOne({
    email: req.body.email,
    deleted: false,
  });
  // console.log(">>>check emailExist: ", emailExist);

  if (emailExist) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
  } else {
    console.log(">>>check req.body: ", req.body);
    req.body.password = md5(req.body.password);
    const records = new Accounts(req.body);
    records.save();

    res.redirect("/admin/accounts");
  }
};
