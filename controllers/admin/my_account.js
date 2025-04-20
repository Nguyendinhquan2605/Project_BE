// [GET] /admin/my-acocunt
module.exports.index = (req, res) => {
  res.render("admin/page/my-account/index.pug", {
    pageTitle: "Thông tin tài khoản",
  });
};
