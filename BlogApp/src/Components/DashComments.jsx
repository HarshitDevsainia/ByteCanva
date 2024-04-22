import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashComments() {
  const currUser=useSelector(state=>state.user);
  const [comments,setComments]=useState([]);
  console.log(currUser);
  useEffect(()=>{
      try{
        const fetchComment=async()=>{
            const res=await fetch('/api/comment/getComments');
            const data=await res.json();
            if(res.ok){
              setComments(data.comments);
              return;
            }
            else{
              console.log(data.message);
            }
        }
        if(currUser)fetchComment();
      }
      catch(err){
        console.log(err);
      }
  },[currUser]);
  console.log(comments);
  return(
        <>
          <h1>DashComment</h1>
        </>
  )
}