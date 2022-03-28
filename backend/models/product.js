const mongoose = require('mongoose')
// const { ObjectId } = mongoose.Schema;



const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "please enter product name"],
        trim:true,
        maxlength: [100 ,'product name cannot exceend 100 character'],

    },
    price: {
        type:Number,
        required: [true, "please enter product price"],
        maxlength: [5 ,'product name cannot exceend 5 character'],
        default:0.0

    },
    description: {
        type:String,
        required: [true, "please enter product description"],
      

    },
    rating:{
        type:Number,
        default:0
        
    },
    //  we use cloudinery is a third party library that hepls us save images directly / videos
    images: [
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required: [true, "please select category for this product"],
        enum:{
            values:[ 
                'electronics',
                'laptops',
                "accessories",
                'headphones',
               ' books',
               'clothes/shoes',
               'beauty/health',
               'sport',
               'home'
            ],
            message: "please select correct category for product"
        }
    },
    seller:{
        type:String,
        required:[true, "please enter product seller"]
    },
    stock:{
        type:String,
        required:[true, 'please enter product stock'],
        maxlength:[5, 'product name cannot exceed 5 characters'],
        default:0
    },
    numOfReview:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
            },
            comment:{
                type:String,
                required:true
            }
            
        }

    ],

   user: {
           type: mongoose.Schema.Types.ObjectId,
           ref:"User",
           required:true
        
           
   },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
module.exports = mongoose.model('Product', productSchema)