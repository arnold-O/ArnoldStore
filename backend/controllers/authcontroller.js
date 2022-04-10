const User = require("../models/user");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

// register a user

exports.registeruser = catchAsyncError(async (req, res, next) => {
  const { name, password, email } = req.body;
  const newUSer = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: "23456789087/6789",
      url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/792056/1.jpg?2765",
    },
  });

  // const token =newUSer.getJwtToken()

  sendToken(newUSer, 200, res);

  res.status(201).json({
    success: true,
    token,
    newUSer,
  });
});

// login user

exports.loginuser = catchAsyncError(async (req, res, next) => {
  const { email, name, password } = req.body;
  // check if the re fiels were entered
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }

  // if user exist find in d DB
  // const user = await User.find({email}).select('+password')
  const user = await User.findOne({ email }).select("+password");

  console.log(user);

  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  // check password is correct or not

  const IspasswordCorrect = user.correctPassword(password);

  if (!IspasswordCorrect) {
    return next(new ErrorHandler("wrong credentials", 401));
  }

  // const token = user.getJwtToken()
  // res.status(200).json({
  //     success:true,
  //     token
  // })
  sendToken(user, 200, res);
});

// paasword reset part
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return next(new ErrorHandler("there is no user with this email", 404));
  }
  // get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset password url
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/user/resetpassword/${resetToken}`;
  const message = `forgot your password? submit new password and password confirm to : ${resetURL}.\n if you didnt ask for this kindly forget`;

  try {
    await sendEmail({
      email: user.email,
      subject: "rest password valid for 10mins",
      message,
    });

    res.status(200).json({
      status: "success",
      message: `email  sent to ${user.email}`,
    });
  } catch (err) {
    user.passwordRestToken = undefined;
    user.passwordRestExpires = undefined;
    await user.save({ validateBeforeSave: false });
  }
});

exports.resetpassword = catchAsyncError(async (req, res, next) => {
  const hashedTOken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // this will find user whose token was sent by the url
  const user = await User.findOne({
    resetpasswordToken: hashedTOken,
    passwordRestExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("token has expired or invalid", 400));
  }

  if (req.body.password !== req.body.passwordconfirm) {
    return next(new ErrorHandler("the password does not match", 400));
  }
  user.password = req.body.password;

  user.resetpasswordToken = undefined;
  user.passwordRestExpires = undefined;

  await user.save();

  //  after this user has changed password hence we generate token again

  sendToken(user, 200, res);
});

// updating users password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  //  we getting the password as well so dat we can check the old pasword before assign the new one
  console.log(user);

  const checkOldHashedPassword = await user.correctPassword(
    req.body.oldpassword
  );
  console.log(checkOldHashedPassword);

  if (!checkOldHashedPassword) {
    return next(new ErrorHandler("old password is not correct ", 400));
  }
  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httponly: true,
  });
  res.status(200).json({
    success: true,
    message: "logout",
  });
});

// users functionalities

exports.updateprofile = catchAsyncError(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };
  // learn how to add image cloudinery

  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    run: true,
    runValidators: true,
  });
  res.status(200).json({
    status: true,
  });
});

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    user,
  });
});

// admin routes

exports.getAllusers = catchAsyncError(async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    suceess: true,
    user,
  });
});
