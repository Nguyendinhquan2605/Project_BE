const settingGeneral = require("../../models/setting_general_model");

//[GET] /admin/setting/general
module.exports.general = async (req, res) => {
  const setting = await settingGeneral.findOne({});
  res.render("admin/page/setting/general.pug", {
    pageTitle: "Trang cài đặt chung",
    setting: setting,
  });
};

//[PATCH] /admin/setting/general
module.exports.generalPatch = async (req, res) => {
  const setting = await settingGeneral.findOne({});
  if (setting) {
    await settingGeneral.updateOne({ _id: setting.id }, req.body);
  } else {
    const record = new settingGeneral(req.body);
    await record.save();
  }

  req.flash("success", "Cập nhật thành công!");
  res.redirect("back");
};
