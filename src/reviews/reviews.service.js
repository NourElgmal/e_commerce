const { auth } = require("../../utils/Authorization");
const {
  add_new,
  get_all,
  update,
  get_one,
  delete_one,
} = require("../Handlers/handlers.factory");
const { review_model } = require("./review.module");

exports.add_review = add_new(review_model, ["title"]);
exports.getall_review = get_all(review_model);
exports.update_review = update(review_model);
exports.getone_review = get_one(review_model);
exports.delete_review = delete_one(review_model);
exports.Auth = auth();
