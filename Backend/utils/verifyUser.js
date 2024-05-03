import Jwt from "jsonwebtoken"
import {errorHandler} from './error.js'

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        next(errorHandler(400,'Unauthorized User'));
    }
    Jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(500,'Unauthorized User'));
        }
        req.user=user;
        next();
    })
}