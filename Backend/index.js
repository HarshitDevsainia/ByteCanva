import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.URL)
.then(()=>{
    console.log('DataBase is Connected');
}).catch((err)=>{
    console.log(err);
});

const app=express();

app.listen('3000',()=>{
    console.log('Your App is Listen At Port 3000');
});