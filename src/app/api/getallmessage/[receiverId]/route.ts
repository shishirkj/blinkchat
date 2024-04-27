import { NextRequest, NextResponse } from "next/server";
import {auth} from "@clerk/nextjs"
import Message from "@/lib/database/models/message.model";
import User from "@/lib/database/models/user.model";
import connectDB from "@/lib/database/mongoose";



interface reveiverType{ 
    params:{ 
        receiverId:string
    }
}

export async function GET(req:NextRequest,context:reveiverType){
    const { userId } = auth();

    if(!userId)
    { 
        NextResponse.json({"success":"false","mssg":"No Pease Login"},{status:500});
    }
    await connectDB();

    const {_id}=await User.findOne({clerkId:userId});
    const senderId = _id.toString();

const {receiverId} = context.params
try {
    const mssgObj1=await Message.findOne({senderId,receiverId})
const mssgObj2 = await Message.findOne({senderId:receiverId,receiverId:senderId})

if(!mssgObj1 && !mssgObj2)
    { 
        return NextResponse.json({succes:true,mssg:"No messages"},{status:200})
    }
    console.log("arr1 and arr2",mssgObj1,mssgObj2)
const arr1 = mssgObj1.messageArray


//if arr2 is empty
if((mssgObj1) && (mssgObj2===null))
    { 
        return NextResponse.json({succes:true,mssg:arr1},{status:200})

    }

    const arr2 = mssgObj2.messageArray

//if arr1 is empty
    if(mssgObj2   && (mssgObj1===null))
        { 
            return NextResponse.json({succes:true,mssg:arr2},{status:200})
    
        }


        let arr3:Array<string> = [];
        
        //if same length arrays
        if (arr1.length === arr2.length) {
            for (let i = 0; i < arr1.length; i++) {
                arr3.push(arr2[i]);
                arr3.push(arr1[i]);
            }
        // if arr1>arr2
        } else if (arr1.length > arr2.length) {
            for (let i = 0; i < arr2.length; i++) {
                arr3.push(arr2[i]);
                arr3.push(arr1[i]);
            }
            for (let i = arr2.length; i < arr1.length; i++) {
                arr3.push(arr1[i]);
            }
            //arr2>arr1
        } else {
            for (let i = 0; i < arr1.length; i++) {
                arr3.push(arr2[i]);
                arr3.push(arr1[i]);
            }
            for (let i = arr1.length; i < arr2.length; i++) {
                arr3.push(arr2[i]);
            }
        }
    
            return NextResponse.json({succes:true,mssg:arr3},{status:200})
} catch (error) {
    return NextResponse.json({succes:false,mssg:error},{status:500})
}


}