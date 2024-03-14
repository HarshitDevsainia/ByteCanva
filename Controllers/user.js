import user from '../models/user.js'; 
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//Sign Up Route
export const signupRoute=async(req,res,next)=>{
    try{
        let username=req.body.username;
        let email=req.body.email;
        let password=await bcrypt.hashSync(req.body.password,10);
        if(username && email && req.body.password && username!='' && email!='' && req.body.password!=''){
            const newUser=await new user({
                username,
                email,
                password
            });
            await newUser.save();
            res.send({JSON , msg:'success signup'});
            return;
        }
        next(errorHandler(404,"All Field are Required"));
        return;
    }
    catch(err){
        next(err);
    }
};

//SignIn Route 

export const signinRoute=async(req,res,next)=>{
    let {username,password}=req.body;
    if(!username || !password || password=='' || username==''){
        return next(errorHandler(404,'All Field are Required'));
    }
    try{
        let Curruser = await user.findOne({username:username});
        let validatePassword = bcrypt.compareSync(password,Curruser.password);
        if(!validatePassword){
            return next(errorHandler(500,'Incorrect Password'));
        }
        console.log(validatePassword);
        const token=jwt.sign({id: Curruser._id},process.env.JWT_SECRET);
        const {password:pass, ...rest} =Curruser._doc
        res.status(200).cookie('access_token', token,{
            httpOnly:true
        }).json(rest);
    }
    catch(err){
        return next(err);
    }
};


export const homeRoute=(req,res)=>{
    res.send('I am Home Route');
}