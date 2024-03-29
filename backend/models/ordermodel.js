import mongoose from "mongoose";
import User from "./usermodel.js";
const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true,
            default:"india"
        },
        pincode:{
            type:Number,
            maxLength:[6,"pincode cannot exceed 6 digit"],
            required:true
        },
        phoneNumber:{
            type:Number,
            maxLength:[10,"phone number cannot exceed 10 digit"],
            required:true
        },
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true 
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            default:"",
        },
        status:{
            type:String,
            default:"",
        },
    },
    paidAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0
    },
    taxPrice:{
        type:Number,
        required:true,
        default:0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type:String,
        required:true,
        default:"proccessing"
    },
    deliveryAt:{
        type:Date,
        default:Date.now(),
    }
})


const Order = mongoose.model("Order",orderSchema);

export default Order;