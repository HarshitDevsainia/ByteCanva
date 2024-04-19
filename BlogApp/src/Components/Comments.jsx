import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa'
import {Button, Textarea} from 'flowbite-react'
import moment from 'moment';
import { errorHandler } from "../../../utils/error";

export default function Comments({comment,onLike,onEdit}) {
    const [user,setUser]=useState({});
    const {currUser}=useSelector(state=>state.user);
    const [showEdit,setShowEdit]=useState(false);
    const [editContent,setEditContent]=useState(comment.content);
    // console.log(currUser._id);
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
    async function handleSave() {
        try{
            const res=await fetch(`/api/comment/editComment/${comment._id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({content:editContent})
            });
            const data=await res.json();
            if(res.ok){
                onEdit(comment._id,editContent);
                setShowEdit(false);
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
                    {showEdit?(
                       <div className="">
                            <Textarea className="mb-2" value={editContent} onChange={(e)=>setEditContent(e.target.value)}/>
                            <div className="flex items-center justify-end gap-4">
                                <Button 
                                   type="button" 
                                   gradientDuoTone={'purpleToBlue'} 
                                   size={'sm'}
                                   onClick={handleSave}
                                >Save</Button>
                                <Button 
                                    type="button" 
                                    gradientDuoTone={'purpleToBlue'} 
                                    size={'sm'} 
                                    outline
                                    onClick={()=>setShowEdit(false)}
                                    >
                                    Cancel</Button>
                            </div>
                       </div>
                    ):(<p className="text-gray-500 pb-2">{comment.content}</p>)}
                    <div className="flex gap-2">
                        <button 
                           type="button"
                           onClick={()=>onLike(comment._id)}
                           className=""
                        >
                         <FaThumbsUp className={` text-sm text-gray-400 hover:text-blue-500 ${currUser && comment.likes.includes(currUser._id) && '!text-blue-500'}`}/>
                        </button>
                        <p className="text-gray-400">
                            {comment.numberOfLike>0 && comment.numberOfLike+" "+(comment.numberOfLike===1?'Like':'Likes')}
                        </p>
                        {currUser && (currUser._id === comment.userId || currUser.isAdmin) && 
                            <button 
                               type="button" 
                               className="text-blue-500 text-sm text-medium"
                               onClick={()=>setShowEdit(true)}
                            >Edit</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}