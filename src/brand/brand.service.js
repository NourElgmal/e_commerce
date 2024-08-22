const { brand_model } = require("./brand.module");
const {
  delete_one,
  get_one,
  get_all,
  update,
  add_new,
} = require("../Handlers/handlers.factory");
const { auth } = require("../../utils/Authorization");
exports.creat_brand = add_new(brand_model, ["name"]);
exports.GetAll_brand = get_all(brand_model);
exports.Get_brand = get_one(brand_model);
exports.Update_brand = update(brand_model);
exports.Delet_brand = delete_one(brand_model);
exports.Auth = auth();
