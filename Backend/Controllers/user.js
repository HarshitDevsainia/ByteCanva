import bcrypt from 'bcrypt';
import user from '../models/user.js';
import { errorHandler } from '../utils/error.js';

export const updateUser=async(req,res,next)=>{
    if(req.user.id!=req.params.id){
       return next(errorHandler(403,'You Are not Allow to update this user'));
    }
    if(req.body.password){
       if(req.body.password.length<6) return next(errorHandler(503,'Password Must at Least 6 Characters'));
       req.body.password=bcrypt.hashSync(req.body.password,10);
    }
    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(errorHandler(400,'Username Must be between 7 to 20 Character'));
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,'Username Can Not Contains Space'));
        }
        if(req.body.username!=req.body.username.toLowerCase()){
            return next(errorHandler(400,'username must be lowercases'));
        }
        if(req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(400,'username can only contain letter and Number spacial Character (^ , $)'));
        }
    }
    try{
        const updateuser=await user.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password
            }
        },{new:true}
        );
        const {password:pass,...rest}=updateuser._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }
};

export const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
    if(!req.user.isAdmin && req.user.id!=id){
        next(errorHandler(400,'You are not allowed to delete this user'));
        return;
    }
    try{
        await user.findByIdAndDelete(id);
        res.status(200).json('Successfully Deleted user');
    }
    catch(err){
        next(err);
    }
}

export const signOut=async(req,res,next)=>{
    try{
       res.clearCookie('access_token').status(200).json('Successfully SignOut');
    }
    catch(err){
        next(err);
    }
}

export const getUsers=async (req,res,next)=>{
    if(!req.user.isAdmin){
        next(errorHandler(400,'Your Are not Allowed to get the User Data'));
    }
    try{
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit=parseInt(req.query.limit) || 9;
        const sortDirection=req.query.sort==='asc'?+1:-1;
        const users=await user.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit);
        const usersWithoutPassword=users.map((user)=>{
            const {password,...rest}=user._doc;
            return rest;
        });
        const now=new Date();
        const oneMonthAgo=new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );
        const lastMonthUser=await user.countDocuments({createdAt:{$gt:oneMonthAgo}});
        const totalUser=await user.countDocuments();
        res.status(200).json({
            users:usersWithoutPassword,
            totalUser:totalUser,
            lastMonthUser:lastMonthUser
        });
    }
    catch(err){
        next(err);
    }
}
export const getUser=async(req,res,next)=>{
    try{
        const currUser=await user.findById(req.params.userId);
        const {password:pass,...rest}=currUser._doc;
        res.status(200).json(rest);
    }
    catch(err){
        next(err);
    }
}