const AppErr = require("../../utils/Apperr");
const { auth } = require("../../utils/Authorization");
const { catcherror } = require("../../utils/catcherr");
const { user_model } = require("../user/user.module");

exports.add_wishlist = catcherror(async (req, res, next) => {
  const { id } = req.params;
  const { product } = req.body;

  if (!id) {
    return next(new AppErr("User ID is required", 400));
  }

  if (!product) {
    return next(new AppErr("Product ID is required", 400));
  }

  let doc = await user_model.findByIdAndUpdate(
    id,
    { $addToSet: { wishlist: req.body.product } },
    { new: true }
  );

  if (doc) {
    res
      .status(200)
      .json({ msg: "Product added to wishlist", wishlist: doc.wishlist });
  } else {
    return next(new AppErr("User not found, check your ID", 404));
  }
});
exports.remove_wishlist = catcherror(async (req, res, next) => {
  const { id } = req.params;
  const { product } = req.body;

  if (!id) {
    return next(new AppErr("User ID is required", 400));
  }

  if (!product) {
    return next(new AppErr("Product ID is required", 400));
  }

  let doc = await user_model.findByIdAndUpdate(
    id,
    { $pull: { wishlist: req.body.product } },
    { new: true }
  );

  if (doc) {
    res
      .status(200)
      .json({ msg: "Product deleted from wishlist", wishlist: doc.wishlist });
  } else {
    return next(new AppErr("User not found, check your ID", 404));
  }
});
exports.get_wishlist = catcherror(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppErr("User ID is required", 400));
  }
  let doc = await user_model.findById(id);

  if (doc) {
    res.status(200).json({ wishlist: doc.wishlist });
  } else {
    return next(new AppErr("User not found, check your ID", 404));
  }
});
exports.Auth = auth();
