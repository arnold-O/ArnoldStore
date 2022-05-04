const catchAsyncError = require("../middleware/catchAsyncError");
const product = require("../models/product");

const Product = require("../models/product");

const APIFeatures = require("../utils/apifeatures");


const ErrorHandler = require("../utils/errorhandler");

//  create products
exports.newProducts = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  // console.log(req.body.user)

  const product = await Product.create(req.body);
  res.status(201).json({
    status: "product created successfully",
    product,
  });
});

exports.getProducts = catchAsyncError(async (req, res, next) => {
  // const productcount = await Product.countDocuments()

  const apifeatures = new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate();

  const allproduct = await apifeatures.query;

  res.status(200).json({
    data: allproduct,
  });
});

// get one product

exports.getOneProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 400));
  }

  res.status(200).json({
    status: true,
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("product not found", 400));

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    status: true,
    product,
  });
});

exports.deleteproduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("product not found", 400));

  await product.remove();

  res.status(200).json({
    status: true,
    message: "product deleted",
  });
});

// review section

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  
  const { rating, comment, productId } = req.body;
  
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const myOrder = await Product.findById(productId)
  console.log(myOrder)

  const AlreadyReviwed = myOrder.reviews.find(
    review=> `${review.user}`.toString() === `${req.user._id}`.toString()
  )
  if(AlreadyReviwed){
    myOrder.reviews.forEach(rev=>{
      if(`${rev.user}`.toString() === `${req.user._id}`.toString()){
        review.comment = comment
        review.rating = rating
      }
    })

  }else{
    myOrder.reviews.push(review)
    myOrder.numOfReviews = myOrder.reviews.length
  }

  myOrder.ratings = myOrder.reviews.reduce((acc, item)=>item.rating + acc, 0) / myOrder.reviews.length

  await myOrder.save({validateBeforeSave: false})


  res.status(200).json({
    success: true
  })


});


exports.getAllReviews = catchAsyncError(async (req, res, next)=>{
  const myOrder = await Product.findById(req.query.id);

  console.log(myOrder)


  
  res.status(200).json({
    success: true,
   review : myOrder.reviews
  })
})

