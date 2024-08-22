const { alowedTo } = require("../../utils/Authorization");
const { UplodeSinglFile } = require("../../utils/FileUplods");
const product = require("../product/product.api");
const {
  creat_brand,
  GetAll_brand,
  Update_brand,
  Delet_brand,
  Get_brand,
  Auth,
} = require("./brand.service");
const express = require("express").Router();
express.use("/:id/product", product);
express
  .route("/")
  .post(Auth, alowedTo("admin"), UplodeSinglFile("image", "brand"), creat_brand)
  .get(GetAll_brand);
express
  .route("/:id")
  .put(Auth, alowedTo("admin"), UplodeSinglFile("image", "brand"), Update_brand)
  .get(Get_brand)
  .delete(Auth, alowedTo("admin"), Delet_brand);
module.exports = express;
