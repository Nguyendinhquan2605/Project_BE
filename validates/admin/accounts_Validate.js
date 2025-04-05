module.exports.createPost = (req, res, next) => {
  // họ tên
  if (!req.body.fullname) {
    req.flash("error", "Vui lòng nhập họ tên!");
    res.redirect("back");
    return;
  }

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
