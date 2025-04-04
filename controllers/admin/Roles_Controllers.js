const Roles = require("../../models/roles_Model");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);

  res.render("admin/page/roles/index.pug", {
    pageTitle: "Trang nhóm quyền",
    records: records,
  });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render("admin/page/roles/create.pug", {
    pageTitle: "Trang tạo nhóm quyền",
  });
};

// [POST] / admin / roles / create;
module.exports.createPost = async (req, res) => {
  console.log(">>>check:", req.body);
  const records = new Roles(req.body);
  await records.save();

  res.redirect("/admin/roles");
};

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const records = await Roles.findOne({
    _id: id,
    deleted: false,
  });

  res.render("admin/page/roles/edit.pug", {
    pageTitle: "Trang chỉnh sửa nhóm quyền",
    records: records,
  });
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  console.log("id: ", req.params.id);
  console.log(">>>check: ", req.body);

  try {
    await Roles.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Cập nhật thành công !");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("/admin/roles");
};

// [GET] /admin/roles/permissons
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Roles.find(find);
  res.render("admin/page/roles/permissions.pug", {
    pageTitle: "Phân quyền",
    records: records,
  });
};

// // [PATCH] /admin/roles/permissons
module.exports.permissionsPatch = async (req, res) => {
  // console.log("check: ", req.body);
  const permissions = JSON.parse(req.body.permissions);
  // console.log("check: ", permissions);
  try {
    for (const items of permissions) {
      await Roles.updateOne(
        { _id: items.id },
        { permissions: items.permissions }
      );
    }
    req.flash("success", "Cập nhật thành công !");
  } catch (error) {
    req.flash("error", "Cập nhật thất bại!");
  }

  res.redirect("back");
};
