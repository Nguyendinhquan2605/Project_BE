const User = require("../../models/user_model");
const md5 = require("md5");

//[GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/page/user/register", {
    pageTittle: "Trang đăng ký tài khoản",
  });
};

//[POST] /user/register
module.exports.postRegister = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  console.log(user);
  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};

//[GET] /user/login
module.exports.login = (req, res) => {
  res.render("client/page/user/login", {
    pageTittle: "Trang đăng ký tài khoản",
  });
};

//[POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", "Mật khẩu không chính xác");
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/");
};
