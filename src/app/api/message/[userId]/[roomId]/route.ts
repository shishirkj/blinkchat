import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/mongoose";
import { pusherServer } from "@/lib/database/pusher";
import Message from "@/lib/database/models/message.model";
import { auth } from "@clerk/nextjs";
import { ErrorHandler } from "@/lib/utils";
import User from "@/lib/database/models/user.model";



export async function PUT(req:NextRequest,context:contextRoom){ 
    try {
        const body = await req.json();
        const {text} = body;
        const { userId } = auth();

        if(!userId)
        { 
            NextResponse.json({"success":"false","mssg":"No Pease Login"},{status:500});
        }
        await connectDB();

        const {_id}=await User.findOne({clerkId:userId});

        const senderId = _id.toString();


        
      
        if(!context.params.roomId ||!context.params.userId )
        { 
         NextResponse.json({"success":"false","mssg":"No RoomId or useriD"},{status:500});
        }
     const roomId = context.params.roomId;
     const receiverId = context.params.userId
    const s= await pusherServer.trigger(roomId,'incoming-message',text);

    

     
     const existingMessage =await Message.findOne({ 
         senderId:senderId,
         receiverId:receiverId,
         roomId:roomId
     })

    //  const existingMessage2 = await Message.findOne({ 
    //     senderId:receiverId,
    //     receiverId:senderId,
    //     roomId:roomId
    //  }) 
     

     if (!existingMessage ) {
         await Message.create({
            senderId:senderId,
            receiverId:receiverId,
            roomId:roomId,
             messageArray: [text] 
         });
         return NextResponse.json({"success":"true","mssg":"mssg stored suucessfully"},{status:200})
     }
     
      
     if(existingMessage)
     {
      await Message.updateOne({
          senderId:senderId,
          receiverId:receiverId,
          roomId:roomId,
     },
     { 
         $push:{ 
             messageArray:text
         }
     })
    }

    // if(existingMessage2)
    // { 

    //     await Message.updateOne({
    //         senderId:receiverId,
    //         receiverId:senderId,
    //         roomId:roomId,
    //    },
    //    { 
    //        $push:{ 
    //            messageArray:text
    //        }
    //    })
    // }
     
     return NextResponse.json({"success":"true","mssg":"mssg stored suucessfully"},{status:200})
     
    } catch (error) {
        return ErrorHandler(error)
    }
}


