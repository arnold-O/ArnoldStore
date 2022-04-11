const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/order");
const Product = require("../models/product");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    paymentInfo,
    totalPrice,
    taxPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    paymentInfo,
    totalPrice,
    taxPrice,
    paidAt:Date.now(),
    user:req.user._id
  });
  res.send(200).json({
      success:true,
      order
  })
});
