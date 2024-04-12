import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import {Alert, Button, Modal, Table} from 'flowbite-react';
import {FaCheck ,FaTimes} from 'react-icons/fa'
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashUser() {
    const {currUser}=useSelector(state=>state.user);
    const [users,setUsers]=useState([]);
    const [showMore,setShowMore]=useState(true);
    const [showModel,setShowModel]=useState(false);
    const [DeleteUserId,setDeleteUserId]=useState(null);
    const [deleteSuccess,setDeleteSuccess]=useState(null);
    const [deleteFailure,setDeleteFailure]=useState(null);
    
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res=await fetch('/api/user/getUser');
                const data=await res.json();
                if(res.ok){
                    setUsers(data.users);
                    if(data.users.length>9){
                        setShowMore(false);
                    }
                }
            }
            catch(err){
                console.log(err.message);
            }
        };
        if(currUser){
            fetchData();
        }
    },[currUser._id]);
    
    async function handleShowMore() {
        const startIndex=users.length;
        try{
            const res=await fetch(`/api/user/getUser?startIndex=${startIndex}`);
            const data=await res.json();
            if(res.ok){
                setUsers((prev)=>[...prev,...data.users]);
                if(data.users.length<9)setShowMore(false);
            }
        }
        catch(err){
            console.log(err.message);
        }
    }
    async function handleDeleteUser() {
        try{
            setShowModel(false);
            setDeleteSuccess(null);
            setDeleteFailure(null);
            const res=await fetch(`/api/user/delete/${DeleteUserId}`,{
                method:'DELETE'
            });
            const data=await res.json();
            if(res.ok){
                setDeleteSuccess('Successfully Delete the User');
                setUsers((prev)=>prev.filter((user)=>user._id!=DeleteUserId));
                return;
            }
            else{
                setDeleteFailure(data.message);
                return;
            }
        }
        catch(err){
            setDeleteFailure(err.message);
            return;
        }
    }
    return(
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
         scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {deleteSuccess && <Alert color={'success'} className="mb-5" onDismiss={() =>setDeleteSuccess(null)}>{deleteSuccess}</Alert>}
            {deleteFailure && <Alert color={'failure'} onDismiss={() =>setDeleteSuccess(null)}>{deleteFailure}</Alert>}
            {currUser && users.length>0 ? (
                <>
                   <Table hoverable className="shadow-md">
                    <Table.Head>
                        <Table.HeadCell>Data Created</Table.HeadCell>
                        <Table.HeadCell>User Image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Admin</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    {users.map((user)=>(
                        <Table.Body className="devide-y" key={user._id}>
                            <Table.Row>
                                <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <img src={`${user.profilePicture}`} alt="this is a image" className="w-20 h-15 rounded-full" />
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.isAdmin?(
                                    <FaCheck color="green"/>
                                ):(
                                    <FaTimes color="red"/>
                                )}</Table.Cell>
                                <Table.Cell>
                                    <span 
                                        type="button" 
                                        onClick={()=>{
                                                setShowModel(true);
                                                setDeleteUserId(user._id);
                                            }
                                        }
                                        className=" text-red-500 font-medium hover:underline cursor-pointer"
                                    >Delete</span></Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                 </Table>
                 {showMore && 
                    <button 
                       type="button" 
                       onClick={handleShowMore} 
                       className="w-full self-center text-teal-500 text-sm py-7" >
                        Show More
                    </button>
                }
                <Modal
                   show={showModel} 
                   onClose={()=>setShowModel(false)}
                   popup
                   size={'sm'}
                >
                    <Modal.Header/>
                    <Modal.Body>
                        <div className="text-center mb-5">
                            <HiOutlineExclamationCircle className="h-12 w-12 text-gray-500 mx-auto mb-2"/>
                            <h3 className=" text-lg font-medium text-gray-500">Are you sure you want to delete the user!</h3>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button color="failure" onClick={handleDeleteUser}>Yes,I'm sure</Button>
                            <Button color="gray" onClick={()=>setShowModel(false)}>No, Cancel</Button>
                        </div>
                    </Modal.Body>
                </Modal>
                </>
            ):('No yet Data Available')}
        </div>
    )
}