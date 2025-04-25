module.exports.postRegister = (req, res, next) => {
  // họ tên
  if (!req.body.fullName) {
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

module.exports.loginPost = (req, res, next) => {
  // email
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  // password
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.forgotPassword = (req, res, next) => {
  // email
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email!");
    res.redirect("back");
    return;
  }

  next();
};

module.exports.resetPassword = (req, res, next) => {
  // password
  if (!req.body.newpassword) {
    req.flash("error", "Vui lòng nhập mật khẩu!");
    res.redirect("back");
    return;
  }

  //confirmPassword
  if (!req.body.repassword) {
    req.flash("error", "Vui lòng nhập lại mật khẩu!");
    res.redirect("back");
    return;
  }

  next();
};
