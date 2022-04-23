const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/order");
const Product = require("../models/product");
const ErrorHandler = require("../utils/errorhandler");

exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    shippingPrice,
    itemsPrice,
    paymentInfo,
    totalPrice,
    taxPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    shippingPrice,
    itemsPrice,
    paymentInfo,
    totalPrice,
    taxPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// single product

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("no order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.getMyOrder = catchAsyncError(async (req, res, next) => {
  const myOrder = await Order.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    myOrder,
  });
});

exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const myOrder = await Order.find();

  let totalAmount = 0;

  myOrder.forEach((item) => {
    return (totalAmount += item.totalPrice);
  });

  res.status(200).json({
    success: true,
    myOrder,
    totalAmount,
  });
});
