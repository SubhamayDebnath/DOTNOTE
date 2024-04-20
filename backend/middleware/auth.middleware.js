import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config()

const isLoggedIn = async(req,res,next) =>{
    const { token } = req.cookies;
    if(!token){
        return  next(new AppError("Unauthenticated,please login again",400));
    }
    const userDetails = await jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = userDetails;
    next();
};

const authorizedRole= (...role) => async(req,res,next) =>{
    const currentUserRoles = req.user.role;
    if(!role.include(currentUserRoles)){
        return  next(new AppError("you do not have permission to access the route ",403));
    }
}
export{
    isLoggedIn,
    authorizedRole
}