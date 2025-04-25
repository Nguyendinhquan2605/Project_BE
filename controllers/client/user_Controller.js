const User = require("../../models/user_model");
const md5 = require("md5");
const forgotPass = require("../../models/forgot_password_model");
const generateHelper = require("../../helper/generate");
const sendMail_Helper = require("../../helper/sendMail");

//[GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/page/user/register", {
    pageTitle: "Trang đăng ký tài khoản",
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
    pageTitle: "Trang đăng nhập",
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

//[GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");

  res.redirect("/");
};

//[GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/page/user/forgot-password.pug", {
    pageTitle: "Trang quên mật khẩu",
  });
};

//[POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("back");
    return;
  }

  // Tạo mã OTP và lưu thông tin yêu cầu vào collection forgot-pasword
  const otp = generateHelper.generateRandomNumber(5);

  const objectForgotPassword = {
    email: req.body.email,
    otp: otp,
    expireAt: Date.now(),
  };

  const forgotPassword = new forgotPass(objectForgotPassword);
  forgotPassword.save();

  // Gửi mã OTP  qua email của user
  const subject = `Mã OTP xác minh lấy lại mật khẩu `;
  const html = `Mã OTP xác minh lấy lại mật khẩu là <b>${otp}</b> . Lưu ý không được để lộ mã OTP.Thời hạn sử dụng là 3 phút`;
  sendMail_Helper.sendMail(req.body.email, subject, html);

  res.redirect(`/user/password/otp?email=${req.body.email}`);
};

//[GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/page/user/otp-password.pug", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};

//[POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await forgotPass.findOne({
    email: email,
    otp: otp,
  });

  console.log(result);

  if (!result) {
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  res.cookie("tokenUser", user.tokenUser);

  res.redirect("/user/password/reset");
};

//[GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/page/user/reset-password.pug", {
    pageTitle: "Cập nhật mật khẩu",
  });
};

//[POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  const newPassword = req.body.newpassword;
  const rePassword = req.body.repassword;

  if (newPassword != rePassword) {
    req.flash("error", "Mật khẩu không trùng khớp!");
    res.redirect("back");
    return;
  }

  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(newPassword),
    }
  );

  res.redirect("/");
};

//[GET] /user/info
module.exports.info = (req, res) => {
  res.render("client/page/user/info.pug", {
    pageTitle: "Trang thông tin cá nhân",
  });
};
