const  jwt  = require("jsonwebtoken");
const User = require("../models/user");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next)=>{
    const { token } = req.cookies
   

    if(!token){
        return next(new ErrorHandler('login first to access this resource', 401))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id);
    
    next()

})