import React from "react";
import {Sidebar} from 'flowbite-react';
import {HiArrowSmRight, HiUser} from 'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { useState , useEffect } from "react";


export default function DashSidebar(){
    const location =useLocation();
    const [tab,setTab] = useState('');

    useEffect(()=>{
        let urlParams= new URLSearchParams(location.search);
        let tabFromUrl=urlParams.get('tab');
        if(tabFromUrl)setTab(tabFromUrl);
    })
   return(
    <Sidebar className=" w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=Profile'>
                    <Sidebar.Item active={tab==='Profile'} icon={HiUser} label={"user"} labelColor="dark" as='div'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight}  labelColor="dark">
                    SignOut
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
   )
}
