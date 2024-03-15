import connectDB from "../database/mongoose";
import { NextResponse } from "next/server";
// import { client } from "@/lib/cache";
import User from '../database/models/user.model';
import { ErrorHandler } from "@/lib/utils";
import { userParamsType,userParams} from '../database/models/user.model';


export async function createUser(data:userParamsType){ 
    try {
        await connectDB();
    console.log(data);
    const parsedSignup = userParams.safeParse(data)
    if(!parsedSignup.success)
    { 
     console.log(parsedSignup.error);
    }
// let unique_id = data.clerkId;
//     await client.hset(unique_id,data);

const newUser = await User.create(data)
console.log("newUser",newUser._id);
    return NextResponse.json({"success":"true",newUser},{status:200})
    } catch (error) {
        ErrorHandler(error)
    }
    
}

