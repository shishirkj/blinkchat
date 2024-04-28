"use client"
import React from 'react';
import { useEffect,useState } from 'react';
import { pusherClient } from "@/lib/database/pusher";
import axios from 'axios';

const MessageContainer = ({roomId}:{roomId:string}) => {

  const API_BASE_URL =process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";
const [mssgArray,setMssgArray] = useState<Array<string>>([])

useEffect(() => {
  // Subscribe to Pusher channel for the roomId
  const channel = pusherClient.subscribe(roomId);

  // Bind to the 'incoming-message' event to receive new messages
  const handleNewMessage = (message: string) => {
    // Update state with the new message
    setMssgArray(prevMessages => [...prevMessages, message]);
  };

  channel.bind('incoming-message', handleNewMessage);

  // Unsubscribe from the Pusher channel when component unmounts
  return () => {
    channel.unbind('incoming-message', handleNewMessage);
    pusherClient.unsubscribe(roomId);
  };
}, [roomId]);

useEffect(()=>{
  const getAllMessages=async()=>{
    console.log("roomId:",roomId)
    const res = await axios.get(`${API_BASE_URL}/api/getallmessage/${roomId}`)
    console.log("readas",res);
    const arr = await res.data
    setMssgArray(arr.mssg);
   
  }
  getAllMessages()


// eslint-disable-next-line react-hooks/exhaustive-deps
},[roomId])

   
  return (
    <div className="flex flex-col-reverse h-[100%] overflow-y-auto bg-gray-200 p-4">
      <div >
        <div className="text-right">
           { 
          mssgArray&&mssgArray.map((text,index)=>(
            <div key={index}>
            <p>{text}</p>
            </div>
           ))
           }
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
