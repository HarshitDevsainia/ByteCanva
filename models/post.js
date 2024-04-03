import mongoose from "mongoose";


const postSchema=mongoose.Schema({
    userId:{
        type:'String',
        required:true
    },
    content:{
        type:'String',
        required:true
    },
    title:{
        type:'String',
        unique:true,
        required:true
    },
    image:{
        type:'String',
        default:'https://www.pexels.com/photo/macbook-air-flower-bouquet-and-magazines-on-white-table-839443/'
    },
    category:{
        type:'String',
        default:'uncategorized'
    },
    slug:{
        type:'String',
        required:true,
        unique:true
    }
},{timestamps:true});

const post=mongoose.model('post',postSchema);

export default post;