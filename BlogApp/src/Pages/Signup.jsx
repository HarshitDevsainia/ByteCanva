import React, { useState } from "react";
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react';
import {Link, useNavigate} from 'react-router-dom';

export default function Signup() {
    let [userData,setUserData]=useState({});
    let [errorMsg,setErrorMsg]=useState(null);
    let [loader,setLoder]=useState(false);
    const navigate=useNavigate();
    function inputhandler(e) {
      setUserData({...userData,[e.target.id]:e.target.value.trim()});  
    }
    async function handleSubmit(e) {
       e.preventDefault();
       if(!userData.username || !userData.email || !userData.password || userData.username==='' || userData.email==='' || userData.password===''){
        return setErrorMsg('Please fill All the Details');
       }
       else{
          setErrorMsg(null);
       }
       try {
            setLoder(true);
            const res=await fetch('/api/auth/signup',{
                method:'Post',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(userData)
            });
            const data=await res.json();
            console.log(data);
            if(data.success===false){
               setErrorMsg('Username Already Exist');
            }
            setLoder(false);
            if(res.ok){
              navigate('/signin');
            }
        }catch (error) {
          setErrorMsg(error.message);
          setLoder(false);
       }
    };
    return(
        <>
          <div className="m-2 flex flex-col md:flex-row items-center md:my-10">
            <div className="w-full p-10 md:w-1/2 flex items-center justify-center">
             <div className="info">
                <h2 className=" text-2xl font-bold  satisfy-regular">ByteCanvas</h2>
                <p>Sign Up to the ByteCanvas</p>
             </div>
            </div>
            <div className="right w-full md:w-1/2 row flex items-center justify-center">
            <div className="form w-3/4">
                <form className="flex w-ful flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="">
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Your Username" />
                    </div>
                    <TextInput id="username" type="text" placeholder="Enter Username" required  shadow onChange={inputhandler} />
                  </div>
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
                  <Button type="submit" disabled={loader}>
                    {
                    loader?
                        (
                          <>
                            <Spinner size='sm'/>
                            <span className="ml-2">Loading...</span>
                          </>
                        )
                    :'Sign Up'
                    }
                  </Button>
                </form>
                <div className="mt-2">
                  <span>Have an Account ? </span>
                  <Link to={'/signin'} className=" text-blue-500">SignIn</Link>
                </div>
                 {errorMsg!=null && 
                 <Alert className="mt-5" color='failure'>{errorMsg}</Alert>}
              </div>
            </div>
          </div>
        </>
    )
}