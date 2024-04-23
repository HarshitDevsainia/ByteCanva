import { Button, Modal, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashComments() {
  const {currUser}=useSelector(state=>state.user);
  const [comments,setComments]=useState([]);
  const [showModel,setShowModel]=useState(false);
  const [commentId,setCommentId]=useState(null);
  const [showMore,setShowMore]=useState(true);
  useEffect(()=>{
      try{
        const fetchComment=async()=>{
            if(!currUser.isAdmin){
              console.log('You are Not allow to access Comments');
              return;
            }
            const res=await fetch('/api/comment/getComments');
            const data=await res.json();
            if(res.ok){
              setComments(data.Comments);
              if(data.Comments.length<9)setShowModel(false);
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
  async function handleDelete() {
    try{
      setShowModel(false);
      if(!currUser.isAdmin){
        console.log('You are not allow to delete the Comment');
        return;
      }
      const res=await fetch(`/api/comment/deleteComment/${commentId}`,{
        method:'DELETE'
      });
      const data=await res.json();
      if(res.ok){
        setComments(comments.filter((comment)=>comment._id!=commentId));
        if(comments.length<9)setShowModel(false);
        setCommentId(null);
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
  async function handleShowMore() {
    try{
      const startIndex=comments.length;
      const res=await fetch(`/api/comment/getComments?startIndex=${startIndex}`);
      const data=await res.json();
      if(res.ok){
        setComments((prev)=>[...prev,...data.Comments]);
        if(data.Comments.length<9)setShowMore(false);
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
        <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
        scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
          {currUser.isAdmin && (comments.length>0 ?(
              <>
                <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Date Updated</Table.HeadCell>
                  <Table.HeadCell>Comment Content</Table.HeadCell>
                  <Table.HeadCell>Number of Likes</Table.HeadCell>
                  <Table.HeadCell>PostId</Table.HeadCell>
                  <Table.HeadCell>UserId</Table.HeadCell>
                  <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                {comments.map((Comment)=>(
                  <Table.Body className=" devide-y" key={Comment._id}>
                    <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                      <Table.Cell className="">{new Date(Comment.createdAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{Comment.content}</Table.Cell>
                      <Table.Cell>{Comment.numberOfLike}</Table.Cell>
                      <Table.Cell>{Comment.postId}</Table.Cell>
                      <Table.Cell>{Comment.userId}</Table.Cell>
                      <Table.Cell>
                        <span 
                          className=" text-red-500 hover:underline font-medium cursor-pointer"
                          onClick={()=>{
                            setShowModel(true);
                            setCommentId(Comment._id);
                          }}>
                          Delete
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
              {showMore && 
                 <button 
                  className="w-full text-teal-500 self-center py-7 text-sm"
                  onClick={handleShowMore}
                >Show More</button>
              }
              <Modal
                show={showModel}
                onClose={()=>{
                  setShowModel(false);
                  setCommentId(null);
                }}
                size={'md'}
                popup
              >
                <Modal.Header/>
                <Modal.Body>
                    <div className=" text-center">
                      <HiOutlineExclamationCircle className='h-12 w-12 mx-auto text-gray-500 mb-4'/>
                      <p className="text-center text-gray-500 text-lg mb-4">Are you sure to delete the Comment!</p>
                    </div>
                    <div className="flex gap-4 items-center justify-center mb-4">
                      <Button color="failure" onClick={handleDelete}>Yes I'm Sure</Button>
                      <Button 
                        color="gray" 
                        onClick={()=>{
                            setShowModel(false);
                            setCommentId(null);
                          }
                        }>No, Cancel</Button>
                    </div>
                </Modal.Body>
              </Modal>
              </>
            ):(
              <p> No Yet Comment</p>
            )
          )
        }
        </div>
  )
}