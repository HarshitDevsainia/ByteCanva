import post from '../models/post.js';
import { errorHandler } from '../utils/error.js';
export const create=async(req,res,next)=>{
    if(!req.user.isAdmin){
      next(errorHandler(400,'You Are not allow to create the post'));
    }
    if(!req.body.title || !req.body.content){
        next(errorHandler('400','please provide all required fields'));
    }
    const slug=req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/);
    const newpost=new post({
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