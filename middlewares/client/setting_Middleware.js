const settingGeneral = require("../../models/setting_general_model");

module.exports.settingGeneral = async (req, res, next) => {
  const setting = await settingGeneral.findOne({});

  res.locals.settingGeneral = setting;
  next();
};
