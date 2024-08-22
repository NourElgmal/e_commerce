const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const sch = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "user name is req"],
      trim: true,
    },
    wishlist: [{ type: mongoose.Types.ObjectId, ref: "product_model" }],
    email: {
      type: String,
      require: [true, "user email is req"],
      trim: true,
      unique: [true, ["user email is already exist"]],
    },
    phone: {
      type: String,
      require: [true, "user phone is req"],
      trim: true,
    },
    pass: {
      type: String,
      require: [true, "user pass is req"],
      minlength: [6, "minlength is  6"],
    },
    passchangAt: {
      type: Date,
      default: Date.now(),
    },
    profile_img: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      require: [true, "user rol is req"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
sch.pre("save", async function () {
  this.pass = await bcrypt.hash(this.pass, 4);
});
sch.pre("findOneAndUpdate", async function () {
  if (!this._update.pass) return;
  this._update.pass = await bcrypt.hash(this._update.pass, 4);
});
module.exports.user_model = mongoose.model("user_model", sch);
