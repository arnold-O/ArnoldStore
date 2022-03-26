const catchAsyncError = require('../middleware/catchAsyncError')
// const { findById } = require('../models/product')
const  Product = require('../models/product')
const APIFeatures = require('../utils/apifeatures')


const ErrorHandler = require('../utils/errorhandler')



//  create products

exports.newProducts = catchAsyncError(async(req,res, next)=>{
   
    const product = await Product.create(req.body)
    res.status(201).json({
        status:"product created successfully",
        product
    })

})



exports.getProducts = catchAsyncError(async(req, res, next)=>{

    const apifeatures = new APIFeatures(Product.find(), req.query).search().filter()
    
    
    const allproduct = await apifeatures.query
    
    res.status(200).json({
        data: allproduct
    })

})


// get one product

exports.getOneProduct = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id)
    if(!product) {
        
        return next(new ErrorHandler('product not found', 400))
    }
    

    res.status(200).json({
        status:true,
        product
    })
})


exports.updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product) 
    return next(new ErrorHandler('product not found', 400))

    product = await Product.findByIdAndUpdate(req.params.id, req.body, 
        {
            new:true,
            runValidators:true,
            useFindAndModify:false

        })
        res.status(200).json({
            status :true,
            product
        })

})


exports.deleteproduct = catchAsyncError(async(req, res, next)=>{

    let product = await Product.findById(req.params.id)
    if(!product) return next(new ErrorHandler('product not found', 400))

    await product.remove()
    
    res.status(200).json({
        status:true,
        message:"product deleted"
    })




})