"use client"

import React from 'react';
import { useState } from 'react';
import z from "zod"
import axios from 'axios';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const MessageInput = ({roomId}:{roomId:string}) => {

  const API_BASE_URL=process.env.NEXT_PUBLIC_MODE==="production"?'https://blinkchat-nu.vercel.app':'http://localhost:3000'
  const [input,setInput] = useState<string>('')
  
async function handleKeyDown(e:React.KeyboardEvent<HTMLInputElement>){ 
  if(e.key==='Enter')
    {
      sendToMessageRoomIdApi();
    }
}


 async function sendToMessageRoomIdApi(){ 
    
    if(!roomId)
    { 
      console.log("no roomId");
    }
const inputParse = z.string().min(1)
const check=inputParse.safeParse(input)
if(!check.success)
  { 
   return toast.error("Invalid message dont send empty message")
  }

    const res=await axios.put(`${API_BASE_URL}/api/message/${roomId}`,{text:input})
if(res)
  { 
    toast.success("message sent")
  }

setInput('')
  }


  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center">
      <input  onKeyDown={handleKeyDown}  value={input} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setInput(e.target.value)}
        type="text"
        placeholder="Type your message..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 mr-2"
      />
      <svg    onClick={sendToMessageRoomIdApi} className='w-6 h-6 text-gray-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
    </div>
  );
};

export default MessageInput;
