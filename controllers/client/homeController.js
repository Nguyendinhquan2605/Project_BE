module.exports.index = async (req, res) => {
  // console.log(">>>check: ", newProductCategory);

  res.render("client/page/home/index.pug", {
    pageTitle: "Trang chủ",
  });
};
