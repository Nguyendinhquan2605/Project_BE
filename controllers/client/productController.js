module.exports.index = (req, res) => {
  res.render("client/page/products/index.pug");
};

module.exports.edit = (req, res) => {
  res.send("Ok edit");
};
