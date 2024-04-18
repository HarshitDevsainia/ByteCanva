import comment from '../models/commet.js'
import { errorHandler } from '../utils/error.js';
export const createComment=async(req,res,next)=>{
    if(req.user.id!=req.body.userId){
        return next(errorHandler(400,"You are not allowed to create the Comment"));
    }
    try{
        const newComment=new comment(req.body);
        await newComment.save();
        res.status(200).json(newComment);
    }
    catch(err){
        next(err);
    }
}
export const getComment=async(req,res,next)=>{
    try{
        const currComment=await comment.find({postId:req.params.postId}).sort({createdAt:-1});
        res.status(200).json({comments:currComment});
    }
    catch(err){
        next(err);
    }
}