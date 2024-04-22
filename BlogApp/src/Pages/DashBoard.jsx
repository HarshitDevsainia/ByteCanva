import React from "react";
import { useState , useEffect } from "react";
import {useLocation} from 'react-router-dom';
import DashSidebar from '../Components/DashSidebar';
import DashProfile from "../Components/DashProfile";
import DashPosts from "../Components/DashPost";
import DashUser from "../Components/DashUser";
import DashComments from "../Components/DashComments";


export default function DashBoard() {
    const location = useLocation();
    const [tab,setTab]=useState('');

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        setTab(tabFromUrl);
    },[location.search]);
    return (
       <div className="min-h-screen flex flex-col md:flex-row">
           <div className="w-full md:w-56">
                {/* SideBar */}
                <DashSidebar/>
           </div>
           {/* Profile */}
           {tab==='Profile' && <DashProfile/>}
           {tab=='Posts' && <DashPosts/>}
           {tab=='Users' && <DashUser/>}
           {tab=='Comments' && <DashComments/>}
       </div>
    )
}