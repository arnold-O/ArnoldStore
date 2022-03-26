const { findById } = require('../models/product')
const  Product = require('../models/product')


//  create products

exports.newProducts = async(req,res, next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        status:"product created successfully",
        product
    })

}



exports.getProducts = async(req, res, next)=>{
    const allproduct = await Product.find()
    
    res.status(200).json({
        data: allproduct
    })

}


// get one product

exports.getOneProduct = async(req, res, next)=>{
    const product = await Product.findById(req.params.id)
    if(!product) return res.status(400).json({
        status:"false",
        messaage:"product not found"
    })

    res.status(200).json({
        status:true,
        product
    })
}


exports.updateProduct = async(req, res, next) => {
    let product = await Product.findById(req.params.id)
    if(!product) return res.status(400).json({
        status:"false",
        messaage:"product not found"
    })

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

}


exports.deleteproduct = async(req, res, next)=>{

    let product = await Product.findById(req.params.id)
    if(!product) return res.status(400).json({
        status:"false",
        messaage:"product not found"
    })

    await product.remove()
    
    res.status(200).json({
        status:true,
        message:"product deleted"
    })




}