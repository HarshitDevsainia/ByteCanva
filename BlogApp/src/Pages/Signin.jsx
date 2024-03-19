import React from "react";
import { useState } from "react";
import { Label , TextInput , Button ,Spinner,Alert} from "flowbite-react";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {signInStart , signInSuccess , signInFailure} from '../redux/user/userSlice';
import OAuth from "../Components/OAuth";


export default function Signin() {
  let [userData,setUserData]=useState({});
  let {loading , error:errorMsg} = useSelector(state=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  function inputhandler(e) {
      setUserData({...userData,[e.target.id]:e.target.value.trim()});  
  }
  async function handleSubmit(e) {
     e.preventDefault();
     if(!userData.email || !userData.password || userData.email==='' || userData.password===''){
        dispatch(signInFailure('Please fill all the Field'));
        return;
     }
     try{
        dispatch(signInStart());
        const res=await fetch('/api/auth/signin',{
          method:'Post',
          headers:{'Content-Type':'Application/json'},
          body:JSON.stringify(userData)
        });
        const data=await res.json();
        
        if(data.success===false){
          dispatch(signInFailure(data.message));
        }
        if(res.ok){
          dispatch(signInSuccess(data))
          navigate('/');
        }
     }
     catch(err){
       dispatch(signInFailure(err.message));
       return;
     }
  };
    return (
        <>
          <div className="m-2 flex flex-col md:flex-row items-center md:my-10">
            <div className="w-full p-10 md:w-1/2 flex items-center justify-center">
             <div className="info">
                <h2 className=" text-2xl font-bold  satisfy-regular">ByteCanvas</h2>
                <p>Sign in to the ByteCanvas</p>
             </div>
            </div>
            <div className="right w-full md:w-1/2 row flex items-center justify-center">
            <div className="form w-3/4">
                <form className="flex w-ful flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your Email" />
                   </div>
                   <TextInput id="email" type="email" placeholder="Enter Email" required shadow onChange={inputhandler} />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password" value="Your password" />
                   </div>
                   <TextInput id="password" type="password" placeholder="Enter Password" required shadow onChange={inputhandler}/>
                 </div>
                  <Button type="submit" disabled={loading}>
                    {
                    loading?
                        (
                          <>
                            <Spinner size='sm'/>
                            <span className="ml-2">Loading...</span>
                          </>
                        )
                    :'Sign In'
                    }
                  </Button>
                  <OAuth/>
                </form>
                <div className="mt-2">
                  <span>Don't Have an Account ? </span>
                  <Link to={'/signup'} className=" text-blue-500">SignUp</Link>
                </div>
                 {errorMsg!=null && 
                 <Alert className="mt-5" color='failure'>{errorMsg}</Alert>}
              </div>
            </div>
          </div>
        </>
    )
}