const Accounts = require("../../models/account_model");

module.exports.requireAuth = async (req, res, next) => {
  console.log(req.cookies.token);
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Accounts.findOne({
      token: req.cookies.token,
    });
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      console.log("check user: ", user);
      next();
    }
  }
};
