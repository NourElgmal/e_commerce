const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "categrey is req"],
      trim: true,
      unique: [true, "categrey is unique"],
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
  doc.img = "http://localhost:3000/category/" + doc.img;
});
module.exports.category_model = mongoose.model("category_model", sch);
