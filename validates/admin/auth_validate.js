module.exports.login = (req, res, next) => {
  //   Email
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  //   Mật khẩu
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }

  next();
};
