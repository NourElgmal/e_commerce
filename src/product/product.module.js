const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "product is req"],
      trim: true,
      unique: [true, "product name is unique"],
    },
    img: [String],
    slug: {
      type: String,
      lowercast: true,
    },
    category_id: {
      type: mongoose.Types.ObjectId,
      ref: "category_model",
      require: [true, "category_id is req"],
    },
    subcategory_id: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory_model",
      require: [true, "subcategory_id is req"],
    },
    brand_id: {
      type: mongoose.Types.ObjectId,
      ref: "brand_model",
      require: [true, "brand_id is req"],
    },
    decs: {
      type: String,
      require: [true, "desc the product is req"],
    },
    quantity: {
      type: Number,
      require: [true, "quantity is req"],
      default: 0,
    },
    price: {
      type: Number,
      require: [true, "price is req"],
      default: 0,
    },
    priceafterdes: {
      type: Number,
      require: [true, "price after des is req"],
    },
    sold: {
      type: Number,
      require: [true, "sold is req"],
      default: 0,
    },
    imgcover: String,

    ratavg: {
      type: Number,
      min: [1, "min prodct avg must greater 1"],
      max: [5, "max prodct avg must minmam 5"],
    },
    ratecount: {
      type: Number,
      default: 0,
    },
    //reviews: [String],
  },
  { timestamps: true, toJson: { virtual: true }, toObject: { virtual: true } }
);
sch.virtual("review", {
  ref: "review_model",
  localField: "_id",
  foreignField: "product_id",
  justOne: true,
});
sch.pre("findOne", function () {
  this.populate("review", "name");
});

sch.post("init", (doc) => {
  if (doc.imgcover && doc.img) {
    doc.imgcover = process.env.PATHIMG + "produc/" + doc.imgcover;
    doc.img = doc.img.map((i) => process.env.PATHIMG + "produc/" + i);
  }
});

module.exports.product_model = mongoose.model("product_model", sch);
