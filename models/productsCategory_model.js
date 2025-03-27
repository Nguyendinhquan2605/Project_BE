const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productsCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
      type: String,
      slug: "title", //sanpham1
      unique: true,
    },
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
productsCategorySchema.plugin(mongoose_delete, { overrideMethods: "all" });

const ProductsCategory = mongoose.model(
  "ProductsCategory",
  productsCategorySchema,
  "products_category"
);

module.exports = ProductsCategory;
