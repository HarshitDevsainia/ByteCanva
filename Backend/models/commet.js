import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLike:{
        type:Number,
        default:0
    },
},{timestamps:true});

const comment=mongoose.model('comment',commentSchema);

export default comment;