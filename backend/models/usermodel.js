import mongoose from "mongoose";
import  validator  from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto"
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true,"Enter your name"],
        maxLength:[30,"name cannot exceed 30 character"],
        minLength:[2,"name should be greater than 2 character"],
    },
    phoneNo:{
        type:String,
        required:[true,"Enter phone number"],
        unique:true,
        maxLength:[10,"Enter valid phone No"],
        minLength:[10,"Enter valid phone No"],
    },
    email:{
        type:String,
        required:[true,"Enter your email"],
        unique:true,
        validate:[validator.isEmail,"Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Enter your password"],
        minLength:[4,"password should be greater than 4 character"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})
userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    
    this.password=await bcrypt.hash(this.password,2);
})


//jwt token
userSchema.methods.getJWTToken= function() {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
}

//compare password
userSchema.methods.comparePassword =async function(enteredpassword) {
    return await bcrypt.compare(enteredpassword,this.password);
}

userSchema.methods.getResetPasswordToken= function() {
    const resetToken=crypto.randomBytes(10).toString("hex");

    //Hashing and adding to userSchema
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest("hex");
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}
const user = mongoose.model("user",userSchema);
export default user;