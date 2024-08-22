const { add_new, sinin } = require("../Handlers/handlers.factory");
const { user_model } = require("./user.module");

module.exports.sinup = add_new(user_model, ["name", "phone", "email", "pass"]);
module.exports.sinin = sinin(user_model);
