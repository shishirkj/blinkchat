"use client"
import Sidebar from "@/components/shared/sidebar";

 import Header from "@/components/shared/Header";
import MessageContainer from "@/components/shared/messageContainer";
import MessageInput from "@/components/shared/messageInput";
import { useEffect,useState } from "react";
import axios from "axios";




 const Room = ({params}:roomProps) => {
  //userId= clickedFriendId on sidbar
  //userId needed for roomIdExists api
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

       getRoomId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
    
 

    if (roomId === undefined) {
      return <div>Loading...</div>;
    }
  
  return (
    (<div>


       <div className="h-screen ">
   
      <div className="flex">

    <div >
        <Sidebar />
    </div>

 
    <div className="flex-1 flex flex-col">
      {userId&&<Header frndId={userId} />}
        <MessageContainer roomId={roomId} />
        <MessageInput roomId={roomId} />
    </div>
</div>

     
    </div>
    </div>)
    
  )
}
export default Room