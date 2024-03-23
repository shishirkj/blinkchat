"use client"
import Sidebar from "@/components/shared/sidebar";
import { UserButton } from "@clerk/nextjs";
 import Header from "@/components/shared/Header";
import MessageContainer from "@/components/shared/messageContainer";
import MessageInput from "@/components/shared/messageInput";
import { useEffect,useState } from "react";
import axios from "axios";
import { Lock } from "@upstash/lock";
import { client } from "@/lib/database/cache";
import { v4 as uuidv4 } from 'uuid';


 const Room = ({params}:roomProps) => {
    const {userId}= params
    const [roomId,setRoomId] = useState();
   

    async function getRoomId() {
      const API_BASE_URL =
   process.env.NEXT_PUBLIC_MODE === "production"? "https://blinkchat-nu.vercel.app": "http://localhost:3000";
  
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/roomIdExists/${userId}`
        );
        const value =await data.mssg;
        setRoomId(value);
      
      } catch (error) {
        console.error("Error fetching roomId:", error);
        setRoomId(undefined); // Reset roomId on error
      }
    }
    
    

 

   useEffect(() => {
    async function fixRaceCondtion(){ 
      //since two browsers were hitting this api at same time it was causing race condition
  //to prevent that we are using lock system from redis

    const lock = new Lock({
      id:uuidv4(),
      lease: 2000,
      redis:client,
    });
console.log("dsdadsad",lock)

    if(await lock.acquire())
    {
       await getRoomId();
       await lock.release()
      }
      else{ 
          console.log("lock not acquired")
      }
  }

  fixRaceCondtion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    
 

    if (roomId === undefined) {
      return <div>Loading...</div>;
    }
  
  return (
    (<div>
       <div className="h-screen ">
      <UserButton afterSignOutUrl="/home" />
      <div className="flex">

    <div >
        <Sidebar />
    </div>

 
    <div className="flex-1 flex flex-col">
        <Header />
        <MessageContainer roomId={roomId} />
        <MessageInput roomId={roomId} userId = {userId} />
    </div>
</div>

     
    </div>
    </div>)
    
  )
}
export default Room