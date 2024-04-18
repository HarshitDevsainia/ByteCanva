import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from 'moment';

export default function Comments({comment}) {
    const [user,setUser]=useState({});
    useEffect(()=>{
       const fetchUser=async()=>{
         try{
            const res=await fetch(`/api/user/${comment.userId}`);
            const data=await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            else{
                setUser(data);
                return;
            }
         }
         catch(err){
            console.log(err);
         }
       }
       if(comment)fetchUser();
    },[comment]);
    return(
        <>
            <div className="flex">
                <div className=" flex-shrink-0 mr-3">
                    <img className="w-10 h-10 rounded-full bg-gray-200" src={`${user.profilePicture}`} alt={`${user.username}`} />
                </div>
                <div className="flex-1">
                    <div className="flex items-center mb-1">
                        <span className="text-sm text-blue-500 font-bold mr-2 truncate">
                            {(user && user.username)?(`@${user.username}`):'Anonymous user'}
                        </span>
                        <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
                    </div>
                    <p className="text-gray-500 pb-2">{comment.content}</p>
                </div>
            </div>
        </>
    )
}