const md5 = require("md5");
const Accounts = require("../../models/account_model");

// [GET] /admin/accounts
module.exports.login = async (req, res) => {
  res.render("admin/page/auth/login.pug", {
    pageTitle: "Trang đăng nhập",
  });
};

// [POST] /admin/accounts
module.exports.loginPost = async (req, res) => {
  console.log(">>>check req.body: ", req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user = await Accounts.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email Không tồn tại!");
    res.redirect("back");
    return;
  }

  if (md5(req.body.password) != user.password) {
    req.flash("error", "Mật khẩu không chính xác!");
    res.redirect("back");
    return;
  }

  console.log(">>>check pass: ", password);

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }

  res.cookie("token", user.token);
  res.redirect("/admin/dashboard");
};

// [GET] /admin/accounts/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};
