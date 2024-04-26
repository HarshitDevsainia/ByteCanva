import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {HiArrowNarrowUp, HiOutlineUserGroup ,HiChatAlt ,HiDocumentText } from 'react-icons/hi';
import {Button, Table} from 'flowbite-react';
import {Link} from 'react-router-dom';

export default function DashBoardComp() {
    const {currUser}=useSelector(state=>state.user);
    const [users,setUsers]=useState(null);
    const [totalUsers,setTotalUsers]=useState(null);
    const [lastMonthUsers,setLastMonthUsers]=useState(null);
    const [comments,setComments]=useState(null);
    const [totalComments,setTotalComments]=useState(null);
    const [lastMonthComments,setLastMonthComments]=useState(null);
    const [posts,setPosts]=useState(null);
    const [totalPosts,setTotalPost]=useState(null);
    const [lastMonthPost,setLastMonthPost]=useState(null);

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const res=await fetch('/api/user/getUser?limit=5');
                const data=await res.json();
                if(res.ok){
                    setUsers(data.users);
                    setTotalUsers(data.totalUser);
                    setLastMonthUsers(data.lastMonthUser)
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
        const fetchPosts=async()=>{
            try{
                const res=await fetch('/api/post/getPost?limit=5');
                const data=await res.json();
                if(res.ok){
                    setPosts(data.posts);
                    setTotalPost(data.totalPosts);
                    setLastMonthPost(data.lastMonthPosts)
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
        const fetchComment=async()=>{
            try{
                const res=await fetch('/api/comment/getComments?limit=5');
                const data=await res.json();
                if(res.ok){
                    setComments(data.Comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComment);
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
        if(currUser.isAdmin){
            fetchUser();
            fetchPosts();
            fetchComment();
        }
    },[currUser]);
    console.log(comments);
    return(
        <>
           <div className="p-3 md:mx-auto">
               <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex flex-col p-3 w-full dark:bg-gray-800 md:w-72 rounded-md shadow-md gap-4">
                        <div className="flex items-center justify-between ">
                            <div className="">
                                <h3 className=" text-gray-500 text-md uppercase">Total Users</h3>
                                <p className="text-2xl">{totalUsers}</p>
                            </div>
                            <HiOutlineUserGroup className=" bg-teal-600 text-white rounded-full text-5xl p-3 shadow-sm" />
                        </div>
                        <div className="flex gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp/>
                                {lastMonthUsers}
                            </span>
                            <div className=" text-gray-500">Last Month</div>
                        </div>
                    </div>
                    <div className="flex flex-col p-3 w-full md:w-72 dark:bg-gray-800 rounded-md shadow-md gap-4">
                        <div className="flex items-center justify-between ">
                            <div className="">
                                <h3 className=" text-gray-500 text-md uppercase">Total Comments</h3>
                                <p className="text-2xl">{totalComments}</p>
                            </div>
                            <HiChatAlt className=" bg-teal-600 text-white rounded-full text-5xl p-3 shadow-sm" />
                        </div>
                        <div className="flex gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp/>
                                {lastMonthComments}
                            </span>
                            <div className=" text-gray-500">Last Month</div>
                        </div>
                    </div>
                    <div className="flex flex-col p-3 w-full md:w-72 dark:bg-gray-800 rounded-md shadow-md gap-4">
                        <div className="flex items-center justify-between ">
                            <div className="">
                                <h3 className=" text-gray-500 text-md uppercase">Total Post</h3>
                                <p className="text-2xl">{totalPosts}</p>
                            </div>
                            <HiDocumentText  className=" bg-teal-600 text-white rounded-full text-5xl p-3 shadow-sm" />
                        </div>
                        <div className="flex gap-2 text-sm">
                            <span className="text-green-500 flex items-center">
                                <HiArrowNarrowUp/>
                                {lastMonthPost}
                            </span>
                            <div className=" text-gray-500">Last Month</div>
                        </div>
                    </div>
               </div>
               <div className="flex-wrap flex gap-4 mx-auto justify-center py-3">
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex items-center p-3 justify-between text-sm font-semibold">
                            <h1 className="text-center p-2">Recent Uses</h1>
                            <Link to={'/dashboard?tab=Users'}>
                                <Button gradientDuoTone={'purpleToBlue'} outline>
                                    See all
                                </Button>
                            </Link>
                        </div>
                        <div className="">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>User Image</Table.HeadCell>
                                    <Table.HeadCell>User Name</Table.HeadCell>
                                </Table.Head>
                                {users && users.map((user)=>(
                                    <Table.Body key={user._id} className=" divide-y">
                                       <Table.Row className="bg-white dark:bg-gray-900 dark:border-gray-700">
                                            <Table.Cell>
                                                 <img src={user.profilePicture} alt="" className="w-10 h-10 rounded-full bg-gray-500" />
                                             </Table.Cell>
                                             <Table.Cell>{user.username}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                            </Table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex items-center p-3 justify-between text-sm font-semibold">
                            <h1 className="text-center p-2">Recent Uses</h1>
                            <Link to={'/dashboard?tab=Comments'}>
                                <Button gradientDuoTone={'purpleToBlue'} outline>
                                    See all
                                </Button>
                            </Link>
                        </div>
                        <div className="">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Comment Content</Table.HeadCell>
                                    <Table.HeadCell>Likes</Table.HeadCell>
                                </Table.Head>
                                {comments && comments.map((comment)=>(
                                    <Table.Body key={comment._id} className=" divide-y">
                                       <Table.Row className="bg-white dark:bg-gray-900 dark:border-gray-700">
                                            <Table.Cell className="w-96 line-clamp-2">{comment.content}</Table.Cell>
                                             <Table.Cell>{comment.numberOfLike}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                            </Table>
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
                        <div className="flex items-center p-3 justify-between text-sm font-semibold">
                            <h1 className="text-center p-2">Recent Uses</h1>
                            <Link to={'/dashboard?tab=Posts'}>
                                <Button gradientDuoTone={'purpleToBlue'} outline>
                                    See all
                                </Button>
                            </Link>
                            
                        </div>
                        <div className="">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Post Image</Table.HeadCell>
                                    <Table.HeadCell>Post Title</Table.HeadCell>
                                    <Table.HeadCell>Post Category</Table.HeadCell>
                                </Table.Head>
                                {posts && posts.map((post)=>(
                                    <Table.Body key={post._id} className=" divide-y">
                                       <Table.Row className="bg-white dark:bg-gray-900 dark:border-gray-700">
                                            <Table.Cell>
                                                 <img src={post.image} alt="" className="w-15 h-10 rounded-md bg-gray-500" />
                                             </Table.Cell>
                                             <Table.Cell className="w-96">{post.title}</Table.Cell>
                                             <Table.Cell className="w-5">{post.category}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                ))}
                            </Table>
                        </div>
                    </div>
               </div>
           </div>
        </>
    )
}