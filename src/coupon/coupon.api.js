const { alowedTo } = require("../../utils/Authorization");
const {
  add_coupon,
  getall_coupon,
  get_coupon,
  update_coupon,
  delete_coupon,
  Auth,
} = require("./coupon.service");

const express = require("express").Router();
express.use(Auth, alowedTo("admin"));
express.route("/").post(add_coupon).get(getall_coupon);
express
  .route("/:id")
  .get(get_coupon)
  .patch(update_coupon)
  .delete(delete_coupon);
module.exports = express;
