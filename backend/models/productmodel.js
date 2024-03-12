import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"please Enter produdt Description"]
    },
    price :{
        type:Number,
        required:[true,"Please enter product price"],
        maxLength:[8,"price can't exceed 8 digit"],
    },
    ratings :{
        type:Number,
        default:0
    },
    images :{
        public_id:{
            type:String,
            required:true
        },
        url :{
            type:String,
            required:true
        }
    },
    category:{
        type:String,
        required: [true,"please enter product category"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"stock cannot exceed 4 character"],
        default:1
    },
    numofreviews :{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
            },
            name:{
                type:String,
            },
            rating:{
                type:Number,
            },
            comment:{
                type:String,
            }
        }
    ],
   
    creatredAt:{
        type:Date,
        default:Date.now
    }

})


const product=mongoose.model("product",productSchema);
export default product;