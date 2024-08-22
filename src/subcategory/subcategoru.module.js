const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "subcategrey is req"],
      trim: true,
      unique: [true, "subcategrey is unique"],
    },
    slug: {
      type: String,
      lowercast: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category_model",
    },
  },
  { timestamps: true }
);
module.exports.subcategory_model = mongoose.model("subcategory_model", sch);
