const { auth } = require("../../utils/Authorization");
const {
  add_new,
  update,
  delete_one,
  get_one,
  get_all,
} = require("../Handlers/handlers.factory");
const { coupon_model } = require("./coupon.module");

exports.add_coupon = add_new(coupon_model, ["code"]);
exports.update_coupon = update(coupon_model);
exports.delete_coupon = delete_one(coupon_model);
exports.get_coupon = get_one(coupon_model);
exports.getall_coupon = get_all(coupon_model);
exports.Auth = auth();
