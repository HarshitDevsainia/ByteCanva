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
export const likeComment=async(req,res,next)=>{
    try{
        const currComment=await comment.findById(req.params.commentId);
        if(!currComment){
            next(errorHandler(400,'No Comment exist'));
            return;
        }
        const userIndex=currComment.likes.indexOf(req.user.id);
        if(userIndex===-1){
            currComment.numberOfLike+=1;
            currComment.likes.push(req.user.id);
        }
        else{
            currComment.numberOfLike-=1;
            currComment.likes.splice(userIndex,1);
        }
        await currComment.save();
        res.status(200).send(currComment);
    } 
    catch(err){
        next(err);
    }
}

export const editComment=async(req,res,next)=>{
    console.log(req.body);
    try{
        const currComment=await comment.findById(req.params.commentId);
        if(!currComment){
            return next(errorHandler(400,'No Comment Exist'));
        }
        if(currComment.userId!=req.user.id && !req.user.isAdmin){
            return next(errorHandler(400,'You are Not allow to edit this comment'));
        }
        const editComment=await comment.findByIdAndUpdate(req.params.commentId,{
            content:req.body.content
        },{new:true});
        res.status(200).json(editComment);
    }catch(err){
        next(err);
    }
}