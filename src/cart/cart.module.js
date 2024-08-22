const mongoose = require("mongoose");
const sch = mongoose.Schema(
  {
    cart_item: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product_model",
          require: [true, "cart_item is requier"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: Number,
      },
    ],
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "user_model",
      require: [true, "user_id is requier"],
    },
    total_price: Number,
    descount_price: Number,
    total_price_descount: Number,
  },
  { timestamps: true }
);
module.exports.cart_model = mongoose.model("cart_model", sch);
