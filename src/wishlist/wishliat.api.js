const { alowedTo } = require("../../utils/Authorization");
const {
  Auth,
  add_wishlist,
  remove_wishlist,
  get_wishlist,
} = require("./wishliat.service");

const express = require("express").Router();
express.use(Auth, alowedTo("user"));
express
  .route("/:id")
  .put(add_wishlist)
  .delete(remove_wishlist)
  .get(get_wishlist);
module.exports = express;
