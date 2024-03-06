import user from '../models/user.js'; 
import bcrypt from 'bcrypt';

export const userTest=async(req,res)=>{
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
            res.send('Hii I am a User');
        }
        return res.status(404).json({message:'All are Required'});
    }
    catch(err){
        res.status(404).json({message:err.message});
    }
};