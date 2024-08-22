const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "brand is req"],
      trim: true,
      unique: [true, "brand is unique"],
    },
    img: String,
    slug: {
      type: String,
      lowercast: true,
    },
  },
  { timestamps: true }
);
sch.post("init", (doc) => {
  doc.img = process.env.PATHIMG + "brand/" + doc.img;
});
module.exports.brand_model = mongoose.model("brand_model", sch);
