const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productsSchema = new mongoose.Schema(
  {
    title: String,
    products_category_id: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    featured: String,
    position: Number,
    slug: {
      type: String,
      slug: "title", //sanpham1
      unique: true,
    },
    CreatedBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Override all methods
productsSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Products = mongoose.model("product", productsSchema);

module.exports = Products;
