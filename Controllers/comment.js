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
export const deleteComment=async(req,res,next)=>{
    try{
        const currComment=await comment.findById(req.params.commentId);
        if(!currComment){
            return next(errorHandler(400,'No Comment exist'));
        }
        if(req.user.id!==currComment.userId && !req.user.isAdmin){
            return next(errorHandler(400,'You are not allow to delete this comment'));
        }
        await comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('Successfully Deleted the Comment');
    }catch(err){
        next(err);
    }
}

export const getComments=async(req,res,next)=>{
    try{
       if(!req.user.isAdmin){
           next(errorHandler(400,'You Are not Allow to get the Comments!'));
           return;
       }
       const startIndex=parseInt(req.query.startIndex)||0;
       const limit=parseInt(req.query.limit)||9;
       const sortDirection= req.query.sortDirection==='desc'?-1:1;
       const Comments=await comment.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit);
       const totalComments=await comment.countDocuments();
       const now=new Date();
       const lastMonthDate=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
       const lastMonthComment=await comment.countDocuments({createdAt:{$gt:lastMonthDate}});

       res.status(200).json({
        Comments,
        totalComments,
        lastMonthComment
       })
    }
    catch(err){
        next(err);
    }
}