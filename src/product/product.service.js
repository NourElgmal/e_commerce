const { product_model } = require("./product.module");
const {
  delete_one,
  get_one,
  get_all,
  update,
  add_new,
} = require("../Handlers/handlers.factory");
const { auth } = require("../../utils/Authorization");
exports.creat_product = add_new(product_model, [
  "name",
  "category_id",
  "brand_id",
  "subcategory_id",
]);
exports.GetAll_product = get_all(product_model);
exports.Get_product = get_one(product_model);
exports.Update_product = update(product_model);
exports.Delet_product = delete_one(product_model);
exports.Auth = auth();
