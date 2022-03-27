const User = require('../models/user')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const sendToken = require('../utils/jwtToken')







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


    // const token =newUSer.getJwtToken()

    sendToken(newUSer, 200, res)


    res.status(201).json({
        success:true,
        token,
        newUSer
    })
})


// login user 

exports.loginuser = catchAsyncError(async(req,res, next)=>{
    const { email, name, password} = req.body
    // check if the re fiels were entered
    if(!email || !password){
        return next(new ErrorHandler('please enter email and password', 400))
    }

    // if user exist find in d DB
    // const user = await User.find({email}).select('+password')
    const user = await User.findOne({ email }).select("+password");

    console.log(user)

    if(!user){
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    // check password is correct or not 


    const IspasswordCorrect = user.correctPassword(password, user.password)

    if(!IspasswordCorrect){
        return next(new ErrorHandler('wrong credentials', 401))
    }


    // const token = user.getJwtToken()
    // res.status(200).json({
    //     success:true,
    //     token
    // })
    sendToken(user, 200, res)

})

exports.logoutUser = catchAsyncError( async(req,res, next)=>{
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httponly:true
    })
    res.status(200).json({
        success:true,
        message:"logout"
    })
})

