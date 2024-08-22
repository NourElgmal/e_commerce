const { category_model } = require("./category.module");
const {
  delete_one,
  get_one,
  get_all,
  update,
  add_new,
} = require("../Handlers/handlers.factory");
const { auth } = require("../../utils/Authorization");
exports.creat_category = add_new(category_model, ["name"]);
exports.GetAll_category = get_all(category_model);
exports.Get_category = get_one(category_model);
exports.Update_category = update(category_model);
exports.Delet_category = delete_one(category_model);
exports.Auth = auth();
