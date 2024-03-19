import { trusted } from "mongoose";
import Product from "../models/productmodel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchmyerror from "../middleware/catchmyerror.js";
import Apifeatures from "../utils/apifeatures.js";

//admin only
const createProduct= catchmyerror(async (req,res,next) => {

    req.body.user=req.user.id;
    const product=await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    });
})

const Updateproduct = catchmyerror(async (req,res) => {
    let product =await Product.findById(req.params.id);
    if(!product) {
        return res.status(500).json({
            success:false,
            massage:"Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body ,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json ({
        success:true,
        product
    })
})



const Deleteproduct=catchmyerror (async (req,res,next) => {
    const product=await Product.findByIdAndDelete(req.params.id);

    if(!product) {
        return res.status(500).json ({
            success:false,
            massage:"product not found"
        })
    } 

    res.status(200).json({
        success:true,
        massage:"Product deleted succesfully"
    })

})


const getproductDetail= catchmyerror(async (req,res,next) => {
    try{
    const product=await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler("product not found",404));
    } 
    res.status(200).json({
        success:true,
        product
    })


    } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          massage: "Error deleting the product",
        });
      }
})

//user
const getAllproducts = catchmyerror(async (req,res) => {
    var resultperPage=4;
    const productCount=await Product.countDocuments();
    const apifeatures= new Apifeatures(Product.find(),req.query)
    .search().filter().pagination(resultperPage);
    const products=await apifeatures.query;
    res.status(200).json({
        success:true,
        products,
        productCount,
        resultperPage
    });
})
//add review for product
const createProductReview=catchmyerror(async(req,res,next)=>{
    const {rating,comment,product_id}=req.body;
    const review={
        user:req.user.id,
        name:req.user.name,
        rating,
        comment
    }
    const product=await Product.findById(product_id);
    const isReviewed=product.reviews.find(rev=>rev.user.toString()===req.user.id);
    if(isReviewed) {
        product.reviews.forEach(rev => {
            if(rev.user.toString()===req.user._id.toString())
            rev.rating=rating,
            rev.comment=comment
        });
    }else {
        product.reviews.push(review);
        product.numofReviews=product.reviews.length
    }
    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })
    product.ratings=avg/product.reviews.length;
    await product.save({validateBeforeSave:false});
    
    res.status(200).json({
        success:true,
        product
    })

})
const getProductReview=catchmyerror(async (req,res,next)=>{
    const product=await Product.findById(req.query.id);
    if(!product) {
        return next(new ErrorHandler("product not found",400));
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
    
})


const deleteReview=catchmyerror(async(req,res,next)=>{
    const product=await Product.findById(req.query.productId);
    if(!product) {
        return next(new ErrorHandler("product not found",400));
    }
    const reviews = product.reviews.filter(rev=> rev._id.toString()!== req.query.id)

    let avg=0;
    reviews.forEach(rev=>{
        avg+=rev.rating;
    })
    const ratings=avg/reviews.length;
    const numofReviews=reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofReviews
    },{
        new:true,
        runValidators:true,
        userFindAndModify:true
    })
    res.status(200).json({
        success:true,
    })
})
export {getAllproducts,createProduct,Updateproduct,
    Deleteproduct,getproductDetail,
    createProductReview,getProductReview,
    deleteReview
};