exports.app_use = (app) => {
  app.use("/category", require("../src/category/api.category"));
  app.use("/subcategory", require("../src/subcategory/subcategory.api"));
  app.use("/brand", require("../src/brand/brand.api"));
  app.use("/product", require("../src/product/product.api"));
  app.use("/user", require("../src/user/user.api"));
  app.use("/wishlist", require("../src/wishlist/wishliat.api"));
  app.use("/review", require("../src/reviews/review.api"));
  app.use("/coupon", require("../src/coupon/coupon.api"));
  app.use("/cart", require("../src/cart/cart.api"));
};
