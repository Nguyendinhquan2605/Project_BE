const md5 = require("md5");
const Roles = require("../../models/roles_Model");
const Accounts = require("../../models/account_model");

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
  const permissions = res.locals.role.permissions;
  console.log("Check: ", permissions);
  if (permissions.include("account_create")) {
    console.log("Có quyền!");
  } else {
    res.send("403");
    return;
  }

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

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  // console.log("check id: ", req.params.id);
  let find = {
    _id: req.params.id,
    deleted: false,
  };

  try {
    const data = await Accounts.findOne(find);

    const roles = await Roles.find({
      deleted: false,
    });

    res.render("admin/page/accounts/edit.pug", {
      pageTitle: "Trang chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect("/admin/accounts");
  }
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const permissions = res.locals.role.permissions;
  console.log("Check: ", permissions);
  if (permissions.include("account_edit")) {
    console.log("Có quyền!");
  } else {
    res.send("403");
    return;
  }

  const emailExist = await Accounts.findOne({
    _id: { $ne: req.params.id },
    email: req.body.email,
    deleted: false,
  });

  if (emailExist) {
    req.flash("error", "Email đã tồn tại");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
      console.log(">>>check req.body: ", req.body);
    }

    await Accounts.updateOne({ _id: req.params.id }, req.body);

    req.flash("success", "Cập nhật thành công!");
  }
  res.redirect("back");
};

// [DELETE] /admin/roles/delete/:id
module.exports.deleteAccount = async (req, res) => {
  // console.log(req.params);
  const id = req.params.id;

  await Accounts.updateOne(
    { _id: id },
    {
      deleted: true,
      deleteAt: new Date(),
    }
  );
  req.flash("success", "Xóa thành công 1 tài khoản!");

  res.redirect("back");
};

// [PATH] /admin/products/change-status/:status/:id
module.exports.changeStatus_Account = async (req, res) => {
  console.log(req.params);
  const status = req.params.status;
  const id = req.params.id;

  await Accounts.updateOne({ _id: id }, { status: status });

  req.flash("success", "Cập nhật trạng thái tài khoản thành công!");

  res.redirect("back");
};
