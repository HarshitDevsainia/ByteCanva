import React, { useState } from "react";
import { useEffect } from "react";
import {useSelector} from 'react-redux';
import {Table, TableCell } from 'flowbite-react'
import { Link } from "react-router-dom";

export default function DashPosts(){
  const {currUser}=useSelector((state)=>state.user);
  const [post,setPost]=useState([]);
  useEffect(()=>{
    const fetchPost=async()=>{
        try{
            const res=await fetch(`/api/post/getPost?user_id=${currUser._id}`);
            const data=await res.json();
            if(res.ok){
              setPost(data.posts);
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
                      <Table.Body className="devide-y">
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
                            <span className=" font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
                          </Table.Cell>
                          <Table.Cell>
                            <Link to={`/update-post/${data.slug}`}>
                                <span className=" text-teal-500">Edit</span>
                            </Link>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                   ))}
                </Table>
            </>
          ):(<p>You have no post yet!</p>))
        }
      </div>
  )
}

