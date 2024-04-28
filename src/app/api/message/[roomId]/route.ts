import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/mongoose";
import { pusherServer } from "@/lib/database/pusher";
import Message from "@/lib/database/models/message.model";
import { auth } from "@clerk/nextjs";
import { ErrorHandler } from "@/lib/service";
import { client } from "@/lib/database/cache";



export async function PUT(req:NextRequest,context:contextRoom){ 
    try {
  
        const body = await req.json();
        const {text} = body;
      
        await connectDB();

        if(!context.params.roomId )
        { 
         NextResponse.json({"success":"false","mssg":"No RoomId "},{status:500});
        }
     const roomId = context.params.roomId;
   await pusherServer.trigger(roomId,'incoming-message',text);
     const existingRoomId =await Message.findOne({ 
         roomId:roomId
     })


     const isRoomIdInCache= await client.lrange(roomId,0,-1);
     //for caching in upstsah storing texts here as well along with mongo below
     if(isRoomIdInCache.length!=0)
        { 
            await client.rpush(roomId,text)
        }

     if (!existingRoomId ) {
         await Message.create({
            roomId:roomId,
             messageArray: [text] 
         });
    
         return NextResponse.json({"success":"true","mssg":"mssg stored suucessfully"},{status:200})
     }
     
      
     if(existingRoomId)
     {
    const b2 =await Message.updateOne({
          roomId:roomId,
     },
     { 
         $push:{ 
             messageArray:text
         }
     })

    }

   
     return NextResponse.json({"success":"true","mssg":"mssg stored suucessfully"},{status:200})
     
    } catch (error) {
        return ErrorHandler(error)
    }
}


