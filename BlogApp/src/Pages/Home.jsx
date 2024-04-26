import React, { useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from '../Components/CallToAction'
import { useEffect } from "react";
import PostCard from '../Components/PostCard'

export default function Home() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchPost=async()=>{
      try{
          const res=await fetch('/api/post/getPost?limit=9');
          const data=await res.json();
          if(res.ok){
            setPosts(data.posts);
            return;
          }
          else{
            console.log(data.message);
          }
      }catch (error) {
          console.log(error);
      }
    }
     fetchPost();
  },[]);

  return (
        <>
          <div className="">
            <div className="flex flex-col gap-6 p-28 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold lg:text-6xl">Welcome to ByteCanva</h1>
                <p className="text-xs text-gray-500 sm:text-sm">your go-to destination for all things web-related! Dive into a world of insightful blog posts   crafted to enrich your knowledge and inspire your digital journey. Whether you're a seasoned   developer, a curious beginner, or simply passionate about the web, you'll find a treasure trove of  articles waiting to be explored. Join our community today and embark on a learning adventure with ByteCanva!</p>
                <Link to={'/search'} className="text-teal-500 text-xs sm:text-sm font-bold hover:underline">View all Posts</Link>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-slate-700">
                <CallToAction/>
            </div>
            <div className="w-full flex flex-wrap p-2 gap-2 items-center justify-center py-7">
              {
                posts && posts.length>0 && (
                  <div className="flex flex-col items-center justify-center gap-6">
                    <h2 className="text-2xl text-center font-semibold">Recent Post</h2>
                    <div className="flex flex-wrap gap-4 items-center justify-center p-2">
                      {posts.map((post)=>(
                        <PostCard key={post._id} post={post}/>
                      ))}
                    </div>
                    <Link to={'/search'} className="text-teal-500 hover:underline text-lg" >View All Posts</Link>
                  </div>
                )
              }
            </div>
          </div>
        </>
  )
}