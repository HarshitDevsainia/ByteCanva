import { FileInput, Select, TextInput , Button } from "flowbite-react";
import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
    return(
        <>
           <div className="p-3 max-w-3xl min-h-screen mx-auto">
               <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
               <form className="flex flex-col gap-4">
                   <div className="flex flex-col gap-4 justify-between sm:flex-row ">
                        <TextInput placeholder="Title" required id="title" className="flex-1"/>
                        <Select>
                            <option value="uncategorized">Select a Category</option>
                            <option value="javascript">JavaScript</option>
                            <option value="reactjs">React Js</option>
                            <option value="nextjs">Next Js</option>
                        </Select>
                   </div>
                   <div className="flex gap-4 items-center justify-between p-3 border-2 border-teal-500 border-dotted">
                       <FileInput type="file" accept="image/*"/>
                       <Button type="button" gradientDuoTone={'purpleToBlue'} size={'sm'} outline>Upload Image</Button>
                   </div>
                   <ReactQuill theme="snow" className="h-72 mb-12" placeholder="Write Something..." required/>
                   <Button type="button" className="mt-5" gradientDuoTone={'purpleToPink'}>Publish</Button>
               </form>
           </div>
        </>
    )
}