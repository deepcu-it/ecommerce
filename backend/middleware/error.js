import ErrorHandler from "../utils/errorhandler.js";



export default (err,req,res,next) => {
    err.statusCode=err.statusCode||500;
    err.message=err.message||"internal server error";

    if(err.name==="castError") {
        const message=`Resource not found invalid ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    if(err.name==="jsonwebTokenError") {
        const message=`Token is not valid`;
        err = new ErrorHandler(message,400);
    }
    if(err.code==11000) {
        const meassage=`User already exist`;
        err=new ErrorHandler(meassage,400);
    }

    res.status(err.statusCode).json ({
        success:false,
        err:err.message
    })
}