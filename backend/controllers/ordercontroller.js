import Order from "../models/ordermodel.js";
import Product from "../models/productmodel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchmyerror from "../middleware/catchmyerror.js";

const newOrder=catchmyerror(async(req,res,next)=>{
    //req.body.user=req.user._id;
    //req.body.orderItems.product=req.product._id;

    const order = await Order.create(req.body);

    res.status(201).json({
        success:true,
        order,
    })
})

const getSingleOrder=catchmyerror(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id);
    if(!order) {
        return next(new ErrorHandler("order not found",400));
    }

    res.status(200).json({
        success:true,
        order,
    })
})
const getmyOrder=catchmyerror(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});
    if(orders.length===0) {
        return next(new ErrorHandler("you have no order",400));
    }

    res.status(200).json({
        success:true,
        orders,
    })
})
const deleteOrder=catchmyerror(async(req,res,next)=>{
    
    const order = await Order.findById(req.params.id);
   
    await order.deleteOne();
    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})

const getAllOrder=catchmyerror(async(req,res,next)=>{
    
    const orders = await Order.find();
    let totalamount=0;
    orders.forEach((order)=>{
        totalamount+=order.totalPrice;
    })

    res.status(201).json({
        success:true,
        totalamount,
        orders,
    })
})
const updateOrderStatus=catchmyerror(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);
    if(order.orderStatus==="Delivered") {
        return next(new ErrorHandler("you have delivered this order",400));
    }
    order.orderItems.forEach(async (order)=>{
        await updateStock(order.product,order.quantity);
    })
    order.orderStatus=req.body.status;
    order.save({validateBeforeSave:false});
    if(req.body.status==="Delivered") {
        order.deliveryAt=Date.now();
    }
    res.status(200).json({
        success:true,
    })
})

async function updateStock(id,quantity) {
    const product=await Product.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}

export {newOrder,getAllOrder,
    getSingleOrder,getmyOrder,
    updateOrderStatus,deleteOrder};