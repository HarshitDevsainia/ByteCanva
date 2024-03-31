import {React , useEffect, useRef, useState } from 'react';
import {Alert, Button, Modal, Spinner, TextInput} from 'flowbite-react';
import {useSelector,useDispatch} from 'react-redux';
import {getStorage,getDownloadURL,ref,uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart,updateSuccess,updateFailure,deleteUserStart,deleteUserSuccess, deleteUserFailure} from '../redux/user/userSlice.js';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
 
export default function DashProfile() {
  const {currUser , error , loading}=useSelector(state=>state.user);
  const [imagefile,setImagefile]=useState(null);
  const [imagefileUrl,setImagefileUrl]=useState(null);
  const [ImageFileUploadError,setImageFileUploadError]=useState(null);
  const [ImageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [ImageFileUploading,setImageFileUploading]=useState(false);
  const [updateError,setUpdateError]=useState(null);
  const [updatedData,setUpdatedData]=useState({});
  const [updateSuccessMsg,setUpdateSuccessMsg]=useState(null);
  const [showModel,SetShowModel]=useState(false);
  const filePickerRef=useRef();
  const dispatch=useDispatch();

  function handleInputData(e) {
    setUpdatedData({...updatedData,[e.target.id]:e.target.value});
  };
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
  async function handleDeleteUser() {
    SetShowModel(false);
    try{
        dispatch(deleteUserStart())
        let res=await fetch(`/api/user/delete/${currUser._id}`,{
          method:'DELETE'
        });
        let data=await res.json();
        if(!res.ok){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        else{
          dispatch(deleteUserSuccess());
          return;
        }
    }
    catch(err){
      dispatch(deleteUserFailure(err.message));
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
          <span className='cursor-pointer' onClick={()=>SetShowModel(true)}>Delete Account</span>
          <span className='cursor-pointer'>Sign Out</span>
      </div>
      {updateError && <Alert color={'failure'} className='mt-2'>{updateError}</Alert>}
      {updateSuccessMsg && <Alert color={'success'} className='mt-2'>{updateSuccessMsg}</Alert>}
      {error && <Alert color={'failure'} className='mt-2'>{error}</Alert>}
      <Modal 
        show={showModel}
        onClose={()=>SetShowModel(false)}
        popup
        size={'md'}
      >
          <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto'/>
                <h3 className='mb-5 text-lg text-gray-400 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
            </div>
            <div className="flex justify-center gap-4">
              <Button color='failure' onClick={handleDeleteUser}>Yes I'm sure</Button>
              <Button color='gray' onClick={()=>SetShowModel(false)}>No,Cancel</Button>
            </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}