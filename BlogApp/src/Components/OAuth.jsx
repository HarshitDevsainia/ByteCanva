import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import {GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth'
import {app} from '../firebase.js'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";


export default  function OAuth() {
    const auth=getAuth(app);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    async function handleGoogleAuth() {
        const porvider=new GoogleAuthProvider();
        porvider.setCustomParameters({prompt:'select_account'});
        try{
            const resultsFromGoogle= await signInWithPopup(auth,porvider);
            const res=await fetch('/api/auth/google',{
                method:'post',
                headers:{'Content-Type':'Application/json'},
                body:JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email:resultsFromGoogle.user.email,
                    googlePhoto:resultsFromGoogle.user.photoURL,
                })
            });
            const data=await res.json();
            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <>
           <Button type="button" gradientDuoTone='pinkToOrange' outline onClick={handleGoogleAuth}>
                <AiFillGoogleCircle className="w-6 h-6 mr-2"/>Continue with Google 
           </Button>
        </>
    )
}

