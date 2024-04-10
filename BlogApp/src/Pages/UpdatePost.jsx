import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import {Button, FileInput, Select, TextInput,Alert} from 'flowbite-react'
import ReactQuill, { Quill } from "react-quill";
import { getDownloadURL, getStorage, uploadBytesResumable , ref} from "firebase/storage";
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { app } from "../firebase";
import { useParams } from 'react-router-dom';
import { useNavigate} from 'react-router-dom'

export default function UpdatePost(params) {
    const {currUser}=useSelector(state=>state.user);
    const [imagefile,setImageFile]=useState(null);
    const [imageUploading,setImageUploading]=useState(false);
    const [imageUploadProgress,setImageUploadProgress]=useState(null);
    const [imageUploadError,setImageUploadError]=useState(null);
    const [imageFileUrl,setImageFileUrl]=useState(null);
    const [errorMessage,setErrorMessage]=useState(null);
    const {postId}=useParams();
    const [currPost,setCurrPost]=useState({});
    const navigate=useNavigate();
    function handleInput(e) {
        setCurrPost({...currPost,[e.target.id]:e.target.value});
    }
    useEffect(()=>{
        async function fetchPost(){
            try{
                setErrorMessage(null);
                const res=await fetch(`/api/post/getPost/?postId=${postId}`);
                const data=await res.json();
                if(!res.ok){
                   setErrorMessage(data.message);
                   return;
                }
                else{
                   setCurrPost(data.posts[0]);
                   return;
                }
            }
            catch(err){
                setErrorMessage(err.message);
                return;
            }
      }
      if(postId){
        fetchPost();
      }
    },[postId]);

    function handleImageUpload(){
        try{
            if(!imagefile){
                setImageUploadError('Please Select the Image first');
                return;
            }
            console.log(imagefile);
            setImageUploading(true);
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName=new Date().getTime()+'-'+imagefile.name;
            const storageRef=ref(storage,fileName);
            const uploadTask=uploadBytesResumable(storageRef,imagefile);

            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error)=>{
                    setImageUploadError('Could Not Upload Image (file must be less than 2MB)');
                    setImageUploading(false);
                    setImageUploadProgress(null);
                    setImageFile(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        setImageFileUrl(downloadUrl);
                        setCurrPost({...currPost,image:downloadUrl});
                        setImageUploadError(null);
                        setImageUploadProgress(null);
                        setImageUploading(false);
                    });
                }
            )
        }
        catch(err){
            setImageUploadError(err.message);
            return
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try{
            const res=await fetch(`/api/post/updatePost/${postId}/${currUser._id}`,{
            method:'PUT',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(currPost),
           });
           const data=res.json;
           if(!res.ok){
            setErrorMessage(data.message);
            return;
           }
           else{
            navigate('/dashboard?tab=Posts');
           }
        }
        catch(err){
            setErrorMessage(err.message);
        }
    }
    return(
        <>
           <div className="p-3 mx-auto max-w-3xl min-h-screen">
            <h1 className="text-center font-semibold text-3xl my-7">Update Post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 justify-between sm:flex-row">
                    <TextInput className="flex-1" placeholder="Title" required id="title" onChange={handleInput} value={currPost.title}/>
                    <Select id="category" value={currPost.category} onChange={handleInput}>
                        <option>Select a Category</option>
                        <option value={'javascript'}>JavaScript</option>
                        <option value={'reactjs'}>ReactJs</option>
                        <option value={'nextjs'}>NextJs</option>
                    </Select>
                </div>
                <div className="flex border-2 items-center border-teal-400 border-dotted p-3 gap-4 justify-between">
                    <FileInput type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])}/>
                    <Button 
                      gradientDuoTone={'purpleToBlue'}
                      type="button"
                      outline
                      size={'sm'}
                      onClick={handleImageUpload}
                      disabled={imageUploadProgress}
                    >
                        {imageUploading?(
                            <div className="h-16 w-16">
                                <CircularProgressbar
                                    value={imageUploadProgress || 0}
                                    text={`${imageUploadProgress}%`}
                                    strokeWidth={5}
                                    styles={
                                        {
                                            root:{
                                                width:'100%',
                                                height:'100%',
                                                position:'absolute',
                                                top:'0',
                                                left:'0'
                                            },
                                            path:{
                                                stroke:`rgba(55,155,255,${imageUploadProgress/100})`
                                            }
                                        }
                                    }
                                />
                            </div>
                        ):
                        'Upload Image' }
                    </Button>
                </div>
                {imageUploadError && <Alert color={'failure'}>{imageUploadError}</Alert>}
                {imageFileUrl && (
                    <img src={`${imageFileUrl}`} alt="image" className="w-full h-2xl" />
                )}
                {!imageFileUrl && currPost.image && (
                    <img src={`${currPost.image}`} alt="image" className="w-full h-2xl" />
                )}
                {errorMessage && <Alert color={'failure'}>{errorMessage}</Alert>}
                <ReactQuill value={currPost.content} theme="snow" className="h-72 mb-12" onChange={(value)=>setCurrPost({...currPost,content:value})}/>
                <Button type="submit" className="mt-5" gradientDuoTone={'purpleToPink'}>Update Post</Button>
            </form>
           </div>
        </>
    )
}