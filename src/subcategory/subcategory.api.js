const { alowedTo } = require("../../utils/Authorization");
const {
  creat_subcategory,
  GetAll_subcategory,
  Update_subcategory,
  Delet_subcategory,
  Get_subcategory,
  Auth,
} = require("./subcategoru.service");
const express = require("express").Router({ mergeParams: true });
express
  .route("/")
  .post(Auth, alowedTo("admin"), creat_subcategory)
  .get(GetAll_subcategory);
express
  .route("/:id")
  .put(Auth, alowedTo("admin"), Update_subcategory)
  .get(Get_subcategory)
  .delete(Auth, alowedTo("admin"), Delet_subcategory);
module.exports = express;
