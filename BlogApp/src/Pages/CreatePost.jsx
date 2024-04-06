import { getDownloadURL, getStorage, uploadBytesResumable ,ref } from "firebase/storage";
import { FileInput, Select, TextInput , Button, Alert } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {app} from '../firebase'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom'


export default function CreatePost() {
    const [imagefile,setImageFile]=useState(null);
    const [imageUploadError,setImageUploadError]=useState(null);
    const [imageUploading,setImageUploading]=useState(false);
    const [imageUploadProgress,setImageUploadProgress]=useState(null);
    const [imageUrl,setImageUrl]=useState(null);
    const [postData,setPostData]=useState({});
    const [createPostError,setCreatePostError]=useState(null);
    const [createPostSuccess,setCreatePostSuccess]=useState(null);
    const navigate=useNavigate();

    function handleInput(e) {
        setPostData({...postData,[e.target.id]:e.target.value});
    }

    async function uploadImage() {
        try{
            if(!imagefile){
                setImageUploadError('Please Select the Image');
                return;
            }
            setImageUploadError(null);
            setImageUploading(true);
            const storage=getStorage(app);
            const fileName=new Date().getTime() + '-' + imagefile.name;
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
                    setImageUploadProgress(null);
                    setImageUploading(false);
                    setImageFile(null);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        setImageUrl(downloadUrl);
                        setPostData({...postData,image:downloadUrl});
                        setImageUploadError(null);
                        setImageUploadProgress(null);
                        setImageUploading(false);
                    });
                }
            )
        }catch(err){
            setImageUploadError(err.message);
            return;
        }
    }
    async function handleSubmit(e){
        e.preventDefault();
        try{
            setCreatePostError(null);
            if(!postData.title || !postData.content || !postData.category){
                setCreatePostError('Title,Content,Category are Required');
                return;
            }
            const res=await fetch('/api/post/create',{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(postData)
            });
            const data=await res.json();
            if(!res.ok){
                setCreatePostError('Internal Server Error');
                setPostData({});
                return;
            }
            else{
                setCreatePostSuccess('Successfully created');
                navigate('/');
                return;
            }
        }
        catch(err){
            setCreatePostError(err.message);
            return;
        }
    }
    return(
        <>
           <div className="p-3 max-w-3xl min-h-screen mx-auto">
               <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
               <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                   {createPostError && <Alert color={'failure'}>{createPostError}</Alert>}
                   {createPostSuccess && <Alert color={'success'}>{createPostSuccess}</Alert>}
                   <div className="flex flex-col gap-4 justify-between sm:flex-row ">
                        <TextInput placeholder="Title" required id="title" className="flex-1" onChange={handleInput}/>
                        <Select id="category" onChange={handleInput}>
                            <option value="uncategorized">Select a Category</option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">React Js</option>
                            <option value="nextjs">Next Js</option>
                        </Select>
                   </div>
                   <div className="flex gap-4 items-center justify-between p-3 border-2 border-teal-500 border-dotted">
                       <FileInput type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])}/>
                       <Button 
                           type="button" 
                           onClick={uploadImage} 
                           disabled={imageUploading}
                           gradientDuoTone={'purpleToBlue'} 
                           size={'sm'} 
                           outline
                           >
                            {imageUploading ?(
                               <div className="w-16 h-16">
                                   <CircularProgressbar
                                   value={imageUploadProgress||0}
                                   text={`${imageUploadProgress}%`}
                                   strokeWidth={5}
                                   styles={
                                    {
                                        root:{
                                            width:'100%',
                                            height:'100%',
                                            position:'absolute',
                                            top:'0',
                                            left:'0',
                                        },
                                        path:{
                                            stroke:`rgba(55,155,255,${imageUploadProgress/100})`
                                        }
                                    }
                                  }
                               />
                               </div>
                            ):"Upload Image"}
                        </Button>
                   </div>
                   {imageUploadError && <Alert color={'failure'}>{imageUploadError}</Alert>}
                   {imageUrl && (
                    <img src={`${imageUrl}`} alt="image" className="w-full h-2xl" />
                   )}
                   <ReactQuill theme="snow" className="h-72 mb-12" placeholder="Write Something..."  onChange={(value)=>setPostData({...postData,content:value})} required/>
                   <Button type="submit" className="mt-5" gradientDuoTone={'purpleToPink'}>Publish</Button>
               </form>
           </div>
        </>
    )
}