import ErrorHandler from "../utils/errorhandler.js";
import catchmyerror from "./catchmyerror.js";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";


const isAuthenticatedUser = catchmyerror (async (req,res,next) => {
    const berear=req.headers['authorization'];
    
    if(!berear) {
        return next(new ErrorHandler("please login to access",401));
    }
    const token = berear.split(" ")[1];
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