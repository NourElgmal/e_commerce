const { catcherror } = require("../../utils/catcherr");
const { cart_model } = require("./cart.module");
const { auth } = require("../../utils/Authorization");
const AppErr = require("../../utils/Apperr");
const { product_model } = require("../product/product.module");
const { coupon_model } = require("../coupon/coupon.module");
let totalprice = 0;
function cultotalprice(cart) {
  cart.cart_item.forEach((element) => {
    totalprice += element.price * element.quantity;
  });
  console.log(cart.descount_price);
  if (cart.descount_price) {
    cart.total_price_descount = (
      cart.total_price -
      (cart.descount_price * cart.total_price) / 100
    ).toFixed(2);
  }
}
exports.add_cart = catcherror(async (req, res, next) => {
  const cart = await cart_model.findOne({ user_id: req.userid });

  const { price } = await product_model
    .findById(req.body.product)
    .select("price");
  console.log(price);
  req.body.price = price;
  if (!cart) {
    const new_cart = new cart_model({
      cart_item: [req.body],
      user_id: req.userid,
    });
    cultotalprice(new_cart);
    new_cart.total_price = totalprice;
    await new_cart.save();
    res.status(200).json({ msg: "add cart", new_cart });
  } else {
    let item = cart.cart_item.find((elm) => elm.product == req.body.product);
    console.log(item);
    if (item) {
      item.quantity += 1;
    } else {
      cart.cart_item.push(req.body);
    }
    cultotalprice(cart);
    cart.total_price = totalprice;
    await cart.save();
    res.status(200).json({ msg: "add cart", cart });
  }
});
/*
exports.remove = catcherror(async (req, res, next) => {
  let cart = await cart_model.findOne({ user_id: req.userid });
  if (cart) {
    let itemIndex = cart.cart_item.findIndex(
      (elm) => elm.product == req.body.product
    );

    if (itemIndex !== -1) {
      // إزالة العنصر من cart_item
      cart.cart_item.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json({ msg: "Item removed from cart", cart });
    } else {
      res.status(404).json({ msg: "Item not found in cart" });
    }
  } else {
    res.status(404).json({ msg: "Cart not found" });
  }
});
*/
exports.remove = catcherror(async (req, res, next) => {
  let { cart_item } = await cart_model.findOneAndUpdate(
    { user_id: req.userid },
    {
      $pull: { cart_item: { _id: req.body.id } },
    },
    { new: true }
  );
  !cart_item && next(new AppErr("not found in cart", 404));
  cart_item && res.status(200).json({ msg: "delete secc", cart_item });
});
exports.update_quentaty = catcherror(async (req, res, next) => {
  const cart = await cart_model.findOne({ user_id: req.userid });
  let item = cart.cart_item.find((elm) => elm.product == req.body.product);
  console.log(item);
  if (item) {
    item.quantity = req.body.quantity;
  } else {
    return next(new AppErr("not found product", 404));
  }
  await cart.save();
  res.status(200).json({ msg: "add cart", cart });
});
///////////////////////////////////////////////////////////////////////////////////////////  لسسه api and test
exports.applycoupon = catcherror(async (req, res, next) => {
  const coupon = await coupon_model.findOne({
    code: req.body.code,
    expires: { $gt: new Date() },
  });

  if (!coupon) return next(new AppErr("Coupon code not found or expired", 404));

  const { discount } = coupon;

  const cart = await cart_model.findOne({ user_id: req.userid });
  if (!cart) return next(new AppErr("Cart not found", 404));

  cart.total_price_descount = (
    cart.total_price -
    (discount * cart.total_price) / 100
  ).toFixed(2);
  cart.descount_price = discount;
  await cart.save();

  res.status(200).json({ msg: "Coupon applied to cart", cart });
});

////////////////////////////////////////////////////////////////////////////////////////
module.exports.Auth = auth();
