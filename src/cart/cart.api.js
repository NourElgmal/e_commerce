const { alowedTo } = require("../../utils/Authorization");
const {
  add_cart,
  Auth,
  remove,
  update_quentaty,
  applycoupon,
} = require("./cart.service");

const express = require("express").Router();
express.use(Auth, alowedTo("user"));
express
  .route("/")
  .post(add_cart)
  .delete(remove)
  .put(update_quentaty)
  .patch(applycoupon);
module.exports = express;
