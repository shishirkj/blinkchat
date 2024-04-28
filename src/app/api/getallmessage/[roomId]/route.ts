import { NextRequest, NextResponse } from "next/server";
import Message from "@/lib/database/models/message.model";
import connectDB from "@/lib/database/mongoose";
import { client } from "@/lib/database/cache";



interface reveiverType{ 
    params:{ 
        roomId:string
    }
}



export async function GET(req:NextRequest,context:reveiverType){

   
        const {roomId} = context.params
      
      
        try {
            
            await connectDB();

                //CACHE USING REDIS
            const cachedMessages = await client.lrange(roomId,0,-1)
            
            if(cachedMessages.length!=0)
                { 
                    return NextResponse.json({succes:true,mssg:cachedMessages},{status:200})
                }
       
                const onlyRoomIdCreatedButEmptyMessageCollection =  await Message.findOne({roomId});
                        if(onlyRoomIdCreatedButEmptyMessageCollection===null)
                            { 
                                 return NextResponse.json({succes:true,mssg:[]},{status:200})
                            }   


    const {messageArray} = await Message.findOne({roomId});
  
                for(let i=0;i<messageArray.length;i++)
                    { 
                     await client.rpush(roomId,messageArray[i])
                      
                    }

    return NextResponse.json({succes:true,mssg:messageArray},{status:200})
} catch (error) {
    return NextResponse.json({succes:false,mssg:error},{status:500})
}

}