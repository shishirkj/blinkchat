"use server"

import connectDB from "../database/mongoose";
import { NextResponse } from "next/server";
// import { client } from "@/lib/cache";
import User from '../database/models/user.model';
import { ErrorHandler } from "../service";
import { userParamsType,userParams} from '../database/models/user.model';
import mongoose from "mongoose";
import { client } from "../database/cache";

export async function createUser(data:userParamsType){ 
    try {
      
        await connectDB();
   
    const parsedSignup = userParams.safeParse(data)
    if(!parsedSignup.success)
    { 
     console.log(parsedSignup.error);
    }
// let unique_id = data.clerkId;
// await client.hset(unique_id,data);
const newUser = await User.create(data)
    return NextResponse.json({"success":"true",newUser},{status:200})
    } catch (error) {
        ErrorHandler(error)
    }
    
}


export async function friendDetails(frndId:string){ 
 await connectDB();
 var objectId = new mongoose.Types.ObjectId(frndId);


 const user = await User.findById(objectId);
 if (!user) {
    throw new Error('User not found');
  }
  const { firstName, photo } = user;

    return { name: firstName, photo };
}
