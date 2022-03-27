const User = require('../models/user')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')







// register a user 

exports.registeruser = catchAsyncError(async(req,res,next)=>{
    const {name, password, email} = req.body
    const newUSer = await User.create({
        name,
        password,
        email,
        avatar:{
            public_id:"23456789087/6789",
            url:"https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/792056/1.jpg?2765"
        }
    })
    res.status(201).json({
        success:true,
        newUSer
    })
})