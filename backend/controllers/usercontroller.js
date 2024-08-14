import User from "../models/usermodel.js";
import ErrorHandler from "../utils/errorhandler.js";
import catchmyerror from "../middleware/catchmyerror.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto"

const RegisteredUser = catchmyerror(async (req,res,next) => {
    const {name,phoneNo,email,password} = req.body;
    const user= await User.create({
        name,
        phoneNo,
        email,
        password,
        avatar:{
            public_id:"sample",
            url:"sample",
        }
    });
    sendToken(user,201,res);

});


//login 
const loginuser= catchmyerror (async (req,res,next) => {
    const {email,password} =req.body;

    if(!email || !password) {
        return next(new ErrorHandler("Please Enter email or password",400));
    }
    const user = await User.findOne({email:email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid email or password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
})

//logout
const logout=catchmyerror(async (req,res,next)=>{
    
    res.status(200).json({
        success:true,
        meassage:"Logged out "
    })
})

//forgot password
const forgotPassword= catchmyerror(async (req,res,next) => {
    const user= await User.findOne({email:req.body.email});
    if(!user) {
        return next(new ErrorHandler("user not found",404));
    }
    const resetToken="77788765";
    await user.save({validateBeforeSave:false});

    
    // try{
    //     await sendEmail({
    //         email:user.email,
    //         subject:`Ecommerce Password  Recovery`,
    //         message,
    //     });
    //     res.status(200).json({
    //         success:true,
    //         message:`Email is sent ot ${user.email}`,
    //     })
    // }catch(error) {
    //     console.log(error);
    //     user.resetPasswordToken=undefined;
    //     user.resetPasswordToken=undefined;
    //     await user.save({validateBeforeSave:false});
    //     return next(new ErrorHandler(err.meassage,500));
    // }

    // console.log("send email succesfully");
    res.status(200).json({
        success:true,
    })
})

const resetPassword=catchmyerror( async(req,res,next) => {
    const resetPasswordToken=req.params.token;
    const user= await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
    if(!user) {
        return next(new ErrorHandler("Reset token is not valid",404));
    }
    if(req.body.password !== req.body.confirmpassword) {
        return next(new ErrorHandler("password does not match"));
    }

    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;

    await user.save();
    sendToken(user,200,res);
})

//userroutes
const getUserDetails=catchmyerror(async(req,res,next) => {
    const user= await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

const updatepassword= catchmyerror(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");
    const ispasswordMatched= await user.comparePassword(req.body.oldpassword);
    if(!ispasswordMatched) {
        return next(new ErrorHandler("Invalid password",400));
    }
    if(req.body.newpassword!==req.body.confirmpassword) {
        return next(new ErrorHandler("password does not matched",400));
    }
    user.password=req.body.newpassword;
    await user.save();
    sendToken(user,200,res);
})

const updateProfile=catchmyerror(async(req,res,next)=>{
    const userPassword = await User.findOne({email:req.body.oldEmail}).select("+password");
    if(!userPassword) {
        return new ErrorHandler("Log in to access");
    }
    const  isUserPasswordMatched = await userPassword.comparePassword(req.body.password);
    if(!isUserPasswordMatched) {
        return new ErrorHandler("Invalid password");
    }
    
    const newUserdata= {
        name:req.body.name,
        email:req.body.newEmail,
        phoneNo:req.body.phoneNo,
    }
    //we will add cloudinary later
    const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })
    
})

//admin routes for access user
const getallUser=catchmyerror(async(req,res,next)=>{
    const user=await User.find();
    res.status(200).json({
        success:true,
        user,
    })
    
})

const getSingleUser=catchmyerror(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user) {
        new ErrorHandler("user does not exist",400);
    }
    res.status(200).json({
        success:true,
        user,
    })
})


const updateUserRole=catchmyerror(async(req,res,next)=>{
    const newUserdata= {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }
    //we will add cloudinary later
    const user=await User.findByIdAndUpdate(req.user.id,newUserdata,{
        new:true,
        runValidators:true,
        userFindAndModify:false
    });
    res.status(200).json({
        success:true
    })
})
//delete user

const deleteUser=catchmyerror(async(req,res,next)=>{
    const user=await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler("user does not exist",400));
    }
    await user.deleteOne();
    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})



export {RegisteredUser,loginuser,logout,
    forgotPassword,resetPassword,getUserDetails,
    updatepassword,updateProfile,getallUser,
    getSingleUser,updateUserRole,deleteUser};