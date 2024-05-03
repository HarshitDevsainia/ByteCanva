import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {FaThumbsUp} from 'react-icons/fa'
import {Alert, Button, Modal, Textarea} from 'flowbite-react'
import moment from 'moment';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function Comments({comment,onLike,onEdit,onDelete}) {
    const [user,setUser]=useState({});
    const {currUser}=useSelector(state=>state.user);
    const [showEdit,setShowEdit]=useState(false);
    const [editContent,setEditContent]=useState(comment.content);
    const [showModel,setShowModel]=useState(false);

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
    async function handleDelete() {
        try{
            setShowModel(false);
            if(comment.userId!==currUser._id && !currUser.isAdmin){
                console.log('You are not allow to delete this comment');
                return;
            }
            const res=await fetch(`/api/comment/deleteComment/${comment._id}`,{
                method:'DELETE'
            });
            const data=await res.json();
            if(res.ok){
                onDelete(comment._id);
                return;
            } 
            else{
                console.log(data.message);
            }
        }
        catch(err){

        }
    }
    return(
        <>
            <div className="flex">
                <div className=" flex-shrink-0 mr-3">
                    <img className="w-10 h-10 border-2 border-gray-300 rounded-full bg-gray-200" src={`${user.profilePicture}`} alt={`${user.username}`} />
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
                    ):(<p className="text-gray-600 dark:text-gray-300 pb-2">{comment.content}</p>)}
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
                            <>
                            <button 
                               type="button" 
                               className="text-gray-400 hover:text-blue-500 text-sm font-medium"
                               onClick={()=>setShowEdit(true)}
                            >Edit</button>
                            <button
                               type="button"
                               className="text-sm font-medium text-gray-400 hover:text-blue-500"
                               onClick={()=>setShowModel(true)}
                            >Delete
                            </button>
                            </>
                        }
                    </div>
                </div>
                <Modal
                   show={showModel}
                   size={'md'}
                   onClose={()=>setShowModel(false)}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mb-4 h-14 w-14 mx-auto text-gray-500"/>
                            <h3 className="text-center text-lg font-normal text-gray-500 mb-4">Are You sure you want to delete this comment!</h3>
                            <div className="flex justify-center gap-4">
                                <Button color="failure" onClick={handleDelete}>Yes,I'm sure</Button>
                                <Button color="gray" onClick={()=>setShowModel(false)}>No,Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}