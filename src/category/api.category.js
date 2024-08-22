const { alowedTo } = require("../../utils/Authorization");
const { UplodeSinglFile } = require("../../utils/FileUplods");

const subcategory_model = require("../subcategory/subcategory.api");
const {
  creat_category,
  GetAll_category,
  Get_category,
  Update_category,
  Delet_category,
  Auth,
} = require("./category.service");

const express = require("express").Router();
express.use("/:id/subcategory", subcategory_model);
express
  .route("/")
  .post(
    Auth,
    alowedTo("admin"),
    UplodeSinglFile("image", "category"),
    creat_category
  )
  .get(GetAll_category);
express
  .route("/:id")
  .get(Get_category)
  .put(
    Auth,
    alowedTo("admin"),
    UplodeSinglFile("image", "category"),
    Update_category
  )
  .delete(Auth, alowedTo("admin"), Delet_category);
module.exports = express;
