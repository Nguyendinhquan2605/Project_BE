const ProductsCategory = require("../models/productsCategory_model");

module.exports.getSubCategory = async (parentId) => {
  const getCategory = async (parentId) => {
    const subs = await ProductsCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });

    let allSubs = [...subs];
    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSubs = allSubs.concat(childs);
    }
    // console.log("check: ", allSubs);
    return allSubs;
  };

  const result = await getCategory(parentId);
  return result;
};
