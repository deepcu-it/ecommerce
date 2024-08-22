import ErrorHandler from "../utils/errorhandler.js";
import catchmyerror from "./catchmyerror.js";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";


const isAuthenticatedUser = catchmyerror (async (req,res,next) => {
    const token=req.headers['authorization'];
    if(token) token = token.split(" ")[1];
    else {
        return next(new ErrorHandler("please login to access",401));
    }
    
    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();

})

const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role :${req.user.role} is not allowed to access`,403));
        }

        next();
    }
}

export { isAuthenticatedUser,authorizeRoles};