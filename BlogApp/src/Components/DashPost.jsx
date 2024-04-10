import React, { useState } from "react";
import { useEffect } from "react";
import {useSelector} from 'react-redux';
import {Button, Modal, Table, TableCell } from 'flowbite-react'
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle, HiUserCircle } from "react-icons/hi";

export default function DashPosts(){
  const {currUser}=useSelector((state)=>state.user);
  const [post,setPost]=useState([]);
  const [showMore,setShowMore]=useState(true);
  const [showModel,setShowModel]=useState(false);
  const [DeletePostId,setDeletePostId]=useState('');
  useEffect(()=>{
    const fetchPost=async()=>{
        try{
            const res=await fetch(`/api/post/getPost?user_id=${currUser._id}`);
            const data=await res.json();
            if(res.ok){
              setPost(data.posts);
              if(data.posts.length<9){
                setShowMore(false);
              }
            }
        } 
        catch(err){
          console.log(err);
        }
    }
    if(currUser.isAdmin){
      fetchPost();
    }
  },[currUser._id]);
  async function handleShowMore() {
    const startIndex=post.length;
    try{
        const res=await fetch(`/api/post/getPost?userId=${currUser._id}&startIndex=${startIndex}`);
        const data=await res.json();
        if(res.ok){
          setPost((prev)=>[...prev,...data.posts]);
          if(data.posts.length<9){
            setShowMore(false);
          }
        }
    }
    catch(err){
      console.log(err);
    }
  }
  async function handleDeletePost() {
    setShowModel(false);
    try{
      const res=await fetch(`/api/post/deletePost/${DeletePostId}/${currUser._id}`,{
        method:'DELETE'
      });
      const data=await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        setPost((prev)=>prev.filter((prevPost)=>(prevPost._id!==DeletePostId)));
      }
    }
    catch(err){
      console.log(err);
    }
    
  }
  return(
      <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
       scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
        {
          currUser && (post.length>0 ?(
            <>
                <Table hoverable className=" shadow-md">
                   <Table.Head>
                      <Table.HeadCell>Data Updated</Table.HeadCell>
                      <Table.HeadCell>Post Image</Table.HeadCell>
                      <Table.HeadCell>Post Title</Table.HeadCell>
                      <Table.HeadCell>Category</Table.HeadCell>
                      <Table.HeadCell>
                        <span>Delete</span>
                      </Table.HeadCell>
                      <Table.HeadCell>
                        <span>Edit</span> 
                      </Table.HeadCell>
                   </Table.Head>
                   {post.map((data)=>(
                      <Table.Body className="devide-y" key={data._id}>
                        <Table.Row className=" bg-white dark:bg-gray-800 dark:border-gray-700">
                          <Table.Cell>{new Date(data.updatedAt).toLocaleDateString()}</Table.Cell>
                          <Table.Cell>
                            <img src={`${data.image}`} alt="img" className="w-20 h-15" />
                          </Table.Cell>
                          <Table.Cell>
                            <Link className="font-medium text-gray-500 dark:text-white" to={`/posts/${data.slug}`}>{data.title}</Link>
                          </Table.Cell>
                          <Table.Cell>{data.category}</Table.Cell>
                          <Table.Cell>
                            <span 
                              className=" font-medium text-red-500 hover:underline cursor-pointer"
                              onClick={()=>{
                                setShowModel(true);
                                setDeletePostId(data._id);
                              }}
                              >Delete
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/update-post/${data._id}`}>
                                <span className=" text-teal-500">Edit</span>
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                   ))}
                </Table>
                {showMore && 
                    <button className="w-full self-center text-sm text-teal-500 py-7" onClick={handleShowMore}>Show More</button>
                }
                <Modal
                  show={showModel}
                  onClose={()=>setShowModel(false)}
                  popup
                  size={'md'}
                >
                  <Modal.Header/>
                  <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-12 w-12 text-gray-500 mx-auto mb-4"/>
                        <h3 className=" text-lg font-medium text-gray-500 mb-5">Are you sure to delete the post!</h3>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button color="failure" onClick={handleDeletePost}>Yes I'm Sure</Button>
                      <Button color="gray" onClick={()=>setShowModel(false)}>No</Button>
                    </div>
                  </Modal.Body>
                </Modal>
            </>
          ):(<p>You have no post yet!</p>))
        }
      </div>
  )
}

