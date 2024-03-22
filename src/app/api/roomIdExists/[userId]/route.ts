import Message from "@/lib/database/models/message.model";
import User from "@/lib/database/models/user.model";
import connectDB from "@/lib/database/mongoose";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

//it checks in client-side room/userId.ts that if roomid already exists by checking senderId and receiver Id to THIS API
//if not create new One



export async function GET (req:NextRequest,context:onlyRoomType){ 
    console.log("dsadsadasvdfsgfsgdfgfdgdf")
await connectDB();
const {userId} = auth();
    console.log("receiverId",context.params.userId);

   const {_id}= await User.findOne({clerkId:userId});


   if(!(_id))
{ 
    return NextResponse.json({"success":"false","mssg":"didnt find senderId"},{status:500})
}

   const senderId = _id.toString();

    console.log("senderId",senderId);

if(!(context.params.userId ))
{ 
    return NextResponse.json({"success":"false","mssg":"didnt receive receiverId"},{status:500})
}

    const receiverId = context.params.userId
  const checkIfRoomIdExistsBetweenTwoUsers= await Message.findOne({senderId:receiverId,receiverId:senderId});

  
  if(!checkIfRoomIdExistsBetweenTwoUsers)
  { 
    const roomId = nanoid();
    return NextResponse.json({"success":"true","mssg":roomId},{status:200})
  }
 const {roomId} = checkIfRoomIdExistsBetweenTwoUsers
 return NextResponse.json({"success":"true","mssg":roomId},{status:200})

}