module.exports.index = (req, res) => {
  res.render("client/page/products/index.pug", {
    pageTitle: "Danh sách sản phẩm",
  });
};

module.exports.edit = (req, res) => {
  res.send("Ok edit");
};
