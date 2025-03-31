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
