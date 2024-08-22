const { auth, alowedTo } = require("../../utils/Authorization");
const {
  add_review,
  getall_review,
  getone_review,
  update_review,
  delete_review,
  Auth,
} = require("./reviews.service");

const express = require("express").Router();
express.route("/").post(Auth, alowedTo("user"), add_review).get(getall_review);
express
  .route("/:id")
  .get(getone_review)
  .put(Auth, alowedTo("user"), update_review)
  .delete(auth, alowedTo("user", "admin"), delete_review);
module.exports = express;
