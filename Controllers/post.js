import post from '../models/post.js';
import { errorHandler } from '../utils/error.js';

export const create=async(req,res,next)=>{
    if(!req.user.isAdmin){
        next(errorHandler(400,'You Are not allow to create the post'));
    }
    if(!req.body.title || !req.body.content){
        next(errorHandler('400','please provide all required fields'));
    }
    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'');
    const newpost=await new post({
        ...req.body,slug,userId:req.user.id
    });
    try{
        let savePost=await newpost.save();
        res.status(200).json({post:savePost});
    }
    catch(err){
        next(err);
    }
}

export const getPost=async(req,res,next)=>{
    const startIndex=parseInt(req.query.startIndex)||0;
    const limit=parseInt(req.query.limit)||9;
    const sortDirection=req.query.order==='asc'?1:-1;

    const posts=await post.find({
        ...(req.query.userId && {userId:req.query.userId}),
        ...(req.query.category && {category:req.query.category}),
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.postId && {_id:req.query.postId}),
        ...(req.query.searchTerm && {
            $or:[
                {title:{$regex:req.query.searchTerm,$options:'i'}},
                {content:{$regex:req.query.searchTerm,$options:'i'}}
            ],
        }),
    }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);
    
    const totalPosts=await post.countDocuments();
    const now=new Date();
    const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate(),
    );
    const lastMonthPosts=await post.countDocuments({createdAt:{$gt:oneMonthAgo}});
    res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts
    });
}

export const DeletePost=async(req,res,next)=>{
    const postId=req.params.postId;
    console.log(req.params);
    if(!req.user.isAdmin || req.user.id!=req.params.userId){
        return(next(errorHandler(400,'You are not allow to Delete the Post')));
    }
    try{
        await post.findByIdAndDelete(postId);
        res.status(200).json('Succuess Fully Deleted');
    }
    catch(err){
        next(err);
    }
}