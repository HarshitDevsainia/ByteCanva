import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from '../Routes/auth.js';
import cookieParser from "cookie-parser";
import userRoute from '../Routes/user.js';
import postRoute from '../Routes/post.js';
import commentRoute from '../Routes/comment.js';
import path from 'path';


dotenv.config();

mongoose.connect(process.env.URL)
.then(()=>{
    console.log('DataBase is Connected');
}).catch((err)=>{
    console.log(err);
});


const app=express();
const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/BlogApp/dist')))
app.use(express.json());
app.use(cookieParser());

app.listen('3000',()=>{
    console.log('Your App is Listen At Port 3000');
});

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'BlogApp','dist','index.html'));
});

//error Handling MiddleWare
app.use((err,req,res,next)=>{
    let statusCode=err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})