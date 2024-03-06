import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoute from '../Routes/user.js';

dotenv.config();

mongoose.connect(process.env.URL)
.then(()=>{
    console.log('DataBase is Connected');
}).catch((err)=>{
    console.log(err);
});

const app=express();
app.use(express.json());

app.listen('3000',()=>{
    console.log('Your App is Listen At Port 3000');
});

app.use('/',userRoute);

app.use((err,req,res,next)=>{
    let statusCode=err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
})