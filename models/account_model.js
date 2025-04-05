const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
const generate = require("../helper/generate");

const accountsSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
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
accountsSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Account = mongoose.model("Account", accountsSchema, "account");

module.exports = Account;
