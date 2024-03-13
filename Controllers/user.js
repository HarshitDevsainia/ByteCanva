import user from '../models/user.js'; 
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

export const userTest=async(req,res,next)=>{
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

export const homeRoute=(req,res)=>{
    res.send('I am Home Route');
}