import React from "react";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import {Link} from 'react-router-dom';

export default function Signup() {
    return(
        <>
          <div className="flex m-2 mt-5 flex-col md:flex-row items-center md:mt-20 ">
            <div className="w-full p-10 md:w-1/2 flex items-center justify-center">
             <div className="info">
                <h2 className=" text-2xl font-bold">ByteCanvas</h2>
                <p>Sign Up to the ByteCanvas</p>
             </div>
            </div>
            <div className="right w-full md:w-1/2 row flex items-center justify-center">
            <div className="form w-3/4">
                <form className="flex w-ful flex-col gap-4">
                  <div className="">
                    <div className="mb-2 block">
                      <Label htmlFor="username" value="Your Username" />
                    </div>
                    <TextInput id="username" type="text" placeholder="Enter Username" required shadow />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Your Email" />
                   </div>
                   <TextInput id="email" type="email" placeholder="Enter Email" required shadow />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="password2" value="Your password" />
                   </div>
                   <TextInput id="password2" type="password" placeholder="Enter Password" required shadow />
                 </div>
                  <Button type="submit">Sign Up</Button>
                </form>
                <div className="mt-2">
                  <span>Have an Account ? </span>
                  <Link to={'/signin'} className=" text-blue-500">SignIn</Link>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}