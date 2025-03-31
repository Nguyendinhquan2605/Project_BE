const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const rolesSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
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
rolesSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Roles = mongoose.model("Roles", rolesSchema, "roles");

module.exports = Roles;
