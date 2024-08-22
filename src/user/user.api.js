const { alowedTo } = require("../../utils/Authorization");
const { sinup, sinin } = require("./user.auth");
const {
  add_user,
  getall_user,
  get_user,
  delete_user,
  update_user,
  chang_pass_user,
  Auth,
} = require("./user.service");

const express = require("express").Router();
express.route("/").post(add_user).get(getall_user);
express
  .route("/:id")
  .put(Auth, alowedTo("user", "admin"), update_user)
  .get(get_user)
  .delete(delete_user);
express.patch("/changepass/:id", chang_pass_user);
express.post("/sinup", sinup);
express.post("/sinin", sinin);
module.exports = express;
