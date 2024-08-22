const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "reviews is req"],
      trim: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user_model",
    },
    product_id: {
      type: mongoose.Types.ObjectId,
      ref: "product_model",
    },
    ratavg: {
      type: Number,
      min: [1, "min rev avg must greater 1"],
      max: [5, "max rev avg must minmam 5"],
    },
  },
  { timestamps: true }
);
sch.pre(/^find/, function () {
  this.populate("user_id", "name");
});
module.exports.review_model = mongoose.model("review_model", sch);
