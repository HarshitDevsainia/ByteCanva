import {React , useEffect, useRef, useState } from 'react';
import {Alert, Button, Spinner, TextInput} from 'flowbite-react';
import {useSelector,useDispatch} from 'react-redux';
import {getStorage,getDownloadURL,ref,uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart,updateSuccess,updateFailure} from '../redux/user/userSlice.js';
 
export default function DashProfile() {
  const {currUser , loading}=useSelector(state=>state.user);
  const [imagefile,setImagefile]=useState(null);
  const [imagefileUrl,setImagefileUrl]=useState(null);
  const [ImageFileUploadError,setImageFileUploadError]=useState(null);
  const [ImageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [ImageFileUploading,setImageFileUploading]=useState(false);
  const [updateError,setUpdateError]=useState(null);
  const [updatedData,setUpdatedData]=useState({});
  const [updateSuccessMsg,setUpdateSuccessMsg]=useState(null);
  const filePickerRef=useRef();
  const dispatch=useDispatch();
  function handleImageFile(e) {
    let file=e.target.files[0];
    if(file){
      setImagefile(file);
      setImagefileUrl(URL.createObjectURL(file));
    }
  }
  useEffect(()=>{
    if(imagefile){
      uploadImage();
    }
  },[imagefile]);
  const uploadImage=async()=>{
    setImageFileUploading(true);
    setImageFileUploadError(null)
    const storage=getStorage(app);
    const fileName=new Date().getTime()+imagefile.name;
    const StorageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(StorageRef,imagefile);

    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error)=>{
        setImageFileUploadError('Could Not Upload Image (file must be less than 2MB)');
        setImageFileUploading(false);
        setImagefileUrl(null);
        setImagefile(null);
        setImageFileUploadProgress(null);
      }
      ,()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setImagefileUrl(downloadURL);
          setUpdatedData({...updatedData,['profilePicture']:downloadURL});
          setImageFileUploadProgress(null);
          setImageFileUploadError(false);
          setImageFileUploading(false);
        });
      }
    );
  }
  function handleInputData(e) {
    setUpdatedData({...updatedData,[e.target.id]:e.target.value});
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccessMsg(null);
    if(Object.keys(updatedData).length===0){
      setUpdateError('No Change Made');
      return;
    }
    if(ImageFileUploading){
      setUpdateError('Please Wait for image Upload');
      return;
    }

    try{
      dispatch(updateStart());
      console.log(currUser);
      const res=await fetch(`/api/user/update/${currUser._id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(updatedData)
      });
      let data=await res.json();

      if(data.success===false){
        setUpdateError(data.message);
        dispatch(updateFailure(data.message));
      }
      if(res.ok){
        dispatch(updateSuccess(data));
        setUpdateSuccessMsg('Successfully Updated User Profile');
      }
    }
    catch(err){
      console.log(err);
        dispatch(updateFailure(err));
        setUpdateError(err.message);
        return;
    }
  }

  return (
    <div className=' max-w-lg p-3 mx-auto w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      {ImageFileUploadError && 
       <Alert color={'failure'}>{ImageFileUploadError}</Alert>
      }
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type="file" accept='images/*' onChange={handleImageFile} ref={filePickerRef} hidden/>
        <div className='relative w-32 h-32 rounded-full self-center cursor-pointer shadow-md overflow-hidden'
          onClick={()=>filePickerRef.current.click()}  
        >
          {ImageFileUploadProgress && (
            <CircularProgressbar
              value={ImageFileUploadProgress || 0}
              text={`${ImageFileUploadProgress}%`}
              strokeWidth={5}
              style={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:'0',
                  left:'0',
                },
                path:{
                  stroke:`rgba(65,152,199,${ImageFileUploadProgress/100})`
                },
               }
              }
            />
          )}
          <img 
            src={imagefileUrl || currUser.profilePicture} 
            alt="user" 
            className={`w-full h-full object-cover rounded-full border-8 border-[lightgray] ${ImageFileUploadProgress 
              && ImageFileUploadProgress<100 
              && 'opacity-60'}`}
          />
        </div>
        <TextInput 
          type='text' 
          id='username'
          placeholder='username'
          defaultValue={currUser.username}
          onChange={handleInputData}
        />
        <TextInput 
          type='email'
          id='email' 
          placeholder='email'
          defaultValue={currUser.email}
          onChange={handleInputData}
        />
        <TextInput 
          type='password' 
          id='password'
          placeholder='password'
          onChange={handleInputData}
        /> 
        <Button
          type='submit'
          gradientDuoTone={'purpleToBlue'}
          outline
        >
          {loading ? (
            <>
              <Spinner size={'md'}/> 
              <span className="ml-2 font-bold">....Updating</span>
            </>
             ): 'Update'}
          </Button>
      </form>
      <div className=" text-red-500 flex justify-between mt-5">
          <span className=' cursor-pointer'>Delete Account</span>
          <span className=' cursor-pointer'>Sign Out</span>
      </div>
      {updateError && <Alert color={'failure'} className='mt-2'>{updateError}</Alert>}
      {updateSuccessMsg && <Alert color={'success'} className='mt-2'>{updateSuccessMsg}</Alert>}
    </div>
  )
}