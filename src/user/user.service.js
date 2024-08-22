const { user_model } = require("./user.module");
const {
  delete_one,
  get_one,
  get_all,
  update,
  add_new,
  changepass,
} = require("../Handlers/handlers.factory");
const { auth } = require("../../utils/Authorization");
module.exports.add_user = add_new(user_model, [
  "name",
  "phone",
  "email",
  "pass",
  "role",
]);
module.exports.getall_user = get_all(user_model);
module.exports.update_user = update(user_model);
module.exports.get_user = get_one(user_model);
module.exports.delete_user = delete_one(user_model);
module.exports.chang_pass_user = changepass(user_model);
exports.Auth = auth();
