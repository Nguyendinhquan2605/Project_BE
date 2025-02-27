const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number, // Sửa lỗi chính tả "discoutPercentage"
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
});

const Products = mongoose.model("product", productsSchema);

module.exports = Products;
