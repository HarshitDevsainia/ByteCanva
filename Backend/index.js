import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRoute from '../Routes/auth.js';
import cookieParser from "cookie-parser";
import userRoute from '../Routes/user.js';
import postRoute from '../Routes/post.js';


dotenv.config();

mongoose.connect(process.env.URL)
.then(()=>{
    console.log('DataBase is Connected');
}).catch((err)=>{
    console.log(err);
});


const app=express();
app.use(express.json());
app.use(cookieParser());

app.listen('3000',()=>{
    console.log('Your App is Listen At Port 3000');
});

app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);

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