export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/database/mongoose";
import { auth } from "@clerk/nextjs";
import Friend from "@/lib/database/models/friend.model";
import User from "@/lib/database/models/user.model";
import { ErrorHandler } from "@/lib/utils";



export async function GET(req: NextRequest) {
    try {
        const { userId } = auth();
        
        await connectDB();
        const dd = await User.findOne({ clerkId: userId });
        if(!dd)
        { 
            return NextResponse.json({"success":"false","mssg":"no user in db"},{status:500})
        }

       
        const data = await Friend.find({invitedBy:dd._id});
        if(!data)
        { 
            return NextResponse.json({"success":"false","mssg":"no friend"},{status:200})
        }

       

        
       return NextResponse.json({"success":"true","mssg":data},{status:200})
    } catch (error) {
        return ErrorHandler(error);
        
    }
 
}
