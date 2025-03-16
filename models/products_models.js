const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const productsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
  },
  {
    timestamps: true,
  }
);

// Override all methods
productsSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Products = mongoose.model("product", productsSchema);

module.exports = Products;
