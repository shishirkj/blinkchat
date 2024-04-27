"use client"
import React from 'react';
import { useEffect,useState } from 'react';
import { pusherClient } from "@/lib/database/pusher";

const MessageContainer = ({roomId}:{roomId:string}) => {
const [mssgArray,setMssgArray] = useState<Array<string>>([])

  useEffect(()=>{ 

    pusherClient.subscribe(roomId);
    pusherClient.bind('incoming-message',(text:string)=>{ 
    setMssgArray((prev) => [...prev, text])
    })
    console.log("mssgArray",mssgArray)
          return()=>{ 
            pusherClient.unsubscribe(roomId)
          }
          
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
  


   
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
