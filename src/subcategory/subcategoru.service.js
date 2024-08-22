const { subcategory_model } = require("./subcategoru.module");
const {
  delete_one,
  get_one,
  get_all,
  update,
  add_new,
} = require("../Handlers/handlers.factory");
const { auth } = require("../../utils/Authorization");
exports.creat_subcategory = add_new(subcategory_model, ["name", "category_id"]);
exports.GetAll_subcategory = get_all(subcategory_model);
exports.Get_subcategory = get_one(subcategory_model);
exports.Update_subcategory = update(subcategory_model);
exports.Delet_subcategory = delete_one(subcategory_model);
exports.Auth = auth();
