import user from '../models/user.js'; 
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const google=async(req,res,next)=>{
    let {name,email,googlePhoto}=req.body;
    try{
        const data=await user.findOne({email});
        if(data){
          const token=jwt.sign({id:data._id , isAdmin:data.isAdmin},process.env.JWT_SECRET);
          const {password:pass,...rest}=data._doc;
          res.status(200).cookie('access_token',token, {
            httpOnly:true,
          },{exp: Math.floor(Date.now() / 1000) + (60 * 60)}).json(rest);
          return;
        }else{
           const genratePassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
           const hashedPassword=bcrypt.hashSync(genratePassword,10);
           const newUser=new user({
            username:name.toLowerCase().split(' ').join(''),
            email:email,
            password:hashedPassword,
            profilePicture:googlePhoto,
           });
           await newUser.save();
           const token=jwt.sign({id:newUser._id , isAdmin:newUser.isAdmin},process.env.JWT_SECRET);
           const {password:pass,...rest}=newUser._doc;
           res.status(200).cookie('access_token', token,{
            httpOnly:true
           },{exp: Math.floor(Date.now() / 1000) + (60 * 60)}).json(rest);
           return;
       }
    }
    catch(err){
       next(err);
       return;
    }

}
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
    let {email,password}=req.body;
    if(!email || !password || password==='' || email===''){
        return next(errorHandler(404,'All Field are Required'));
    }
    try{
        let Curruser = await user.findOne({email:email});
        let validatePassword = bcrypt.compareSync(password,Curruser.password);
        if(!validatePassword){
            return next(errorHandler(500,'Incorrect Password'));
        }
        const token=jwt.sign({id: Curruser._id , isAdmin:Curruser.isAdmin},process.env.JWT_SECRET);
        const {password:pass, ...rest} =Curruser._doc
        res.status(200).cookie('access_token', token,{
            httpOnly:true
        },{exp: Math.floor(Date.now() / 1000) + (60 * 60)}).json(rest);
    }
    catch(err){
        return next(err);
    }
};
