import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {Button, Textarea} from 'flowbite-react';
import Comments from "./Comments";

export default function CommentSection(postID) {
    const {currUser}=useSelector(state=>state.user);
    const [comment ,setComment]=useState('');
    const [allComments,setAllComments]=useState([]);

    //For geting All Comment
    useEffect(()=>{
        const fetchComment=async()=>{
           try{
              const res=await fetch(`/api/comment/getComment/${postID.postId}`,{method:'GET'});
              const data=await res.json();
              if(res.ok){
                setAllComments(data.comments.map((comment)=>comment));
                return;
              } 
              else{
                console.log(data.message);
              }
           }
           catch(err){
            console.log(err);
           }
        }
        fetchComment();
    },[postID]);
    async function handleSubmit(e) {
      e.preventDefault();
      try{
        const Comment={
          content:comment,
          postId:postID.postId,
          userId:currUser._id
        }
        const res=await fetch('/api/comment/createComment',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(Comment)
        });
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
        }
        else{
          setComment('');
          setAllComments([data,...allComments]);
          return;
        }
      }
      catch(err){
        console.log(err);
      }
    }
    return(
      <div className="max-w-3xl">
        {currUser ?(
            <div className="p-7 flex flex-col gap-2">
              <div className="flex gap-1">
                <p>Sign in as:</p>
                <img className="h-6 w-6 rounded-full" src={`${currUser.profilePicture}`} alt="image" />
                <Link className=" text-blue-700 underline font-medium" to={'/dashboard?tab=Profile'}>{currUser.username}</Link>
              </div>
              {currUser && (
                <form className="border border-teal-500 p-3 rounded-lg" onSubmit={handleSubmit}>
                  <Textarea 
                    name="comment"
                    value={comment}
                    placeholder="Write Comment Here...." 
                    rows={3} 
                    onChange={(e)=>setComment(e.target.value)}
                    maxLength={200}/>
                  <div className="flex justify-between mt-5">
                    <p className=" text-gray-500 text-xs">{comment?(200-comment.length):(200)} Characters Remaining</p>
                    <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>Submit</Button>
                  </div>
                </form>
              )}
               {allComments.length===0?(<p>No Yet Commets</p>):(
                <>
                    <div className="text-sm my-5 flex gap-2 items-center">
                      <p>Commets</p>
                      <div className="border-2 border-gray-400 py-1 px-2 rounded-sm">{allComments.length}</div>
                    </div>
                    {allComments.map((currComment)=>(
                        <Comments comment={currComment}/>
                    ))}
                </>)
               } 
            </div>
        ):(
            <p>Sign in to Comment : <Link to={'/signin'}>SignIn</Link></p>
        )}
      </div>
    )
}