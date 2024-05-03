import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from '../Components/PostCard';

export default function Search(){
    const location=useLocation();
    const [searchData,setSeachData]=useState({ 
        searchTerm: '',
        sort:'desc',
        category:'uncategorized'
    });
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [showMore,setShowMore]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        const urlParams=new URLSearchParams(location.search);
        const searchTermFromURL=urlParams.get('searchTerm');
        const sortFromURL=urlParams.get('sort');
        const categoryFromUrl=urlParams.get('category');
        if(searchTermFromURL || sortFromURL || categoryFromUrl){
            setSeachData({
                ...searchData,
                searchTerm:searchTermFromURL||'',
                sort:sortFromURL||'desc',
                category:categoryFromUrl||'uncategorized'
            });
        }

        const fetchPost=async()=>{
            try{
                setLoading(true);
                const searchQuery=urlParams.toString();
                const res=await fetch(`/api/post/getPost?${searchQuery}`);
                const data=await res.json();
                if(res.ok){
                    setLoading(false);
                    if(data.posts.length<9)setShowMore(false);
                    setPosts(data.posts);
                }
                else{
                    console.log(data.message);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchPost();
    },[location.search]);
    const handleChange=async(e)=>{
        let searchTag=e.target.id;
        if(searchTag==='searchTerm'){
            setSeachData({...searchData,searchTerm:e.target.value});
        }
        if(searchTag==='sort'){
            const sort=e.target.value || 'desc';
            setSeachData({...searchData,sort});
        }
        if(searchTag==='category'){
            const category=e.target.value || 'uncategorized';
            setSeachData({...searchData,category});
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const urlParams=new URLSearchParams(location.search);
        urlParams.set('searchTerm',searchData.searchTerm);
        urlParams.set('sort',searchData.sort);
        urlParams.set('category',searchData.category);
        const newURL=urlParams.toString();
        navigate(`/search?${newURL}`);
    }
    const handleShowMore=async()=>{
        try{
           const startIndex=posts.length; 
           const urlParams=new URLSearchParams(location.search);
           const searchQuery=urlParams.toString();
           const res=await fetch(`/api/post/getPost?${searchQuery}&startIndex=${startIndex}`);
           const data=await res.json();
           if(res.ok){
               if(data.posts.length<9)setShowMore(false);
               setPosts((prev)=>[...prev,...data.posts]);
           }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="searchTerm" className=" font-semibold whitespace-nowrap">Search Term:</label>
                        <TextInput
                           placeholder="Search"
                           id="searchTerm"
                           onChange={handleChange}
                           value={searchData.searchTerm}
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="sort" className="font-semibold">Sort:</label>
                        <Select 
                            onChange={handleChange}
                            id="sort"
                            value={searchData.sort}
                        >
                            <option value='desc'>Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex gap-2 items-center">
                        <label htmlFor="sort" className="font-semibold">Category:</label>
                        <Select 
                           onChange={handleChange} 
                           id="category"
                           value={searchData.category}
                        >
                            <option value='uncategorized'>Uncategorized</option>
                            <option value="reactjs">ReactJs</option>
                            <option value="nextjs">NextJs</option>
                            <option value="javascript">JavaScript</option>
                        </Select>
                    </div>
                    <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>Search</Button>
                </form>
            </div>
            <div className="flex flex-col w-full">
                <div className="text-center">
                    <h1 className="text-2xl p-5 font-semibold font-serif">Posts</h1>
                </div>
                <div className="p-5 flex flex-wrap gap-5 items-center justify-center">
                    {!loading && posts.length===0 && <p className="text-xl text-gray-500">No post yet Available</p>}
                    {loading && <p className="text-lg font-normal text-gray-500">Loading.....</p>}
                    {!loading && posts.length>0 && posts.map((post)=>(
                                <PostCard key={post._id} post={post}/>
                            )
                        )
                    }
                    {!loading && showMore && posts.length>0 && <button className="text-lg text-teal-400 p-7 w-full hover:underline" onClick={handleShowMore}>Show More</button>}
                </div>
            </div>
        </div>
    )
}