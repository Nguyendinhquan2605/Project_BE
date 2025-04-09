const Accounts = require("../../models/account_model");
const Roles = require("../../models/roles_Model");

module.exports.requireAuth = async (req, res, next) => {
  // console.log(req.cookies.token);
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Accounts.findOne({
      token: req.cookies.token,
    }).select("-password");
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      const role = await Roles.findOne({
        _id: user.role_id,
      }).select(" title permissions");

      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
