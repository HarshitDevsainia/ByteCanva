import React from "react";
import {Link} from 'react-router-dom'

export default function PostCard({post}) {
    return(
        <>
            <div className="group relative border-2 border-teal-500 w-full h-[380px] overflow-hidden transition-all rounded-lg sm:w-[380px]">
                <Link to={`/posts/${post.slug}`}>
                    <img src={post.image} 
                        alt="post-cover"
                        className=" h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20" />
                </Link>
                <div className=" flex flex-col gap-2 p-3">
                    <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
                    <span className=" italic text-sm">{post.category}</span>
                    <Link 
                       to={`/posts/${post.slug}`}
                       className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border-2 border-teal-500 text-teal-500 hover:bg-teal-500
                       hover:text-white text-center py-2 m-2 transition-all duration-300 rounded-md !rounded-tl-none"
                    >Read Artical</Link>
                </div>
            </div>
        </>
    )
}