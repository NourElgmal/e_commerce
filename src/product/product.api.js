const { alowedTo } = require("../../utils/Authorization");
const { UplodefieldsFiles } = require("../../utils/FileUplods");
const {
  creat_product,
  GetAll_product,
  Update_product,
  Delet_product,
  Get_product,
  Auth,
} = require("./product.service");
const express = require("express").Router({ mergeParams: true });
let pathsname = [
  { name: "imgcover", maxCount: 1 },
  { name: "img", maxCount: 3 },
];
express
  .route("/")
  .post(
    Auth,
    alowedTo("admin"),
    UplodefieldsFiles(pathsname, "product"),
    creat_product
  )
  .get(GetAll_product);
express
  .route("/:id")
  .put(Auth, alowedTo("admin"), Update_product)
  .get(Get_product)
  .delete(Auth, alowedTo("admin"), Delet_product);
module.exports = express;
