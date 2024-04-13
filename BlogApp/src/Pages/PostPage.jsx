import React, { useState } from "react";
import { useEffect } from "react";
import {useParams ,Link} from 'react-router-dom';
import {Button, Spinner} from 'flowbite-react'


export default function PostPage() {
    const {postSlug}=useParams();
    const [currPost,setCurrPost]=useState(null);
    const [postError,setPostError]=useState(null);
    const [postLoading,setPostLoading]=useState(false);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setPostLoading(true);
                const res=await fetch(`/api/post/getPost?slug=${postSlug}`);
                const data=await res.json();
                if(!res.ok){
                    setPostError(data.message);
                    return;
                }
                else{
                    setCurrPost(data.posts[0]);
                    setPostLoading(false);
                    return;
                }
            }
            catch(err){
                setPostError(err.message);
                return;
            }
        }
        if(postSlug)fetchData();
    },[postSlug]);
    console.log(currPost);
    if(postLoading){
        return(
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size={'xl'}/>
            </div>
        )
    }
    return(
        <>
           <main className=" p-3 mx-w-6xl flex flex-col min-h-screen mx-auto">
                <h1 className=" text-3xl text-center mt-10 font-serif max-w-2xl mx-auto lg:text-4xl">{currPost && currPost.title}</h1>
                <Link className=" self-center mt-5" to={`/Search?category=${currPost && currPost.category}`}>
                    <Button color="gray" size={'xs'} pill>{currPost && currPost.category}</Button>
                </Link>
                <img src={`${currPost && currPost.image}`} alt={`${currPost && currPost.title}`} 
                className=" p-3 mt-10 mx-auto w-full md:max-w-3xl object-cover max-h-[600px]:"/>
                <div className="flex justify-between w-full md:max-w-3xl mx-auto  items-center p-3 border-b border-slate-300">
                    <span>{currPost && new Date(currPost.createdAt).toLocaleDateString()}</span>
                    <span>{currPost && (currPost.content.length/1000).toFixed(0)}mins read</span>
                </div>
                <div className=" p-8 max-w-2xl mx-auto w-full post-Content" dangerouslySetInnerHTML={{__html:currPost && currPost.content}}></div>
           </main>
        </>
    )
}