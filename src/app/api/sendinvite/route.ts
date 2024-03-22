import { NextRequest,NextResponse } from "next/server";
import sendEmail, { ErrorHandler } from "@/lib/utils";
import {auth} from "@clerk/nextjs"
import connectDB from "@/lib/database/mongoose";
import User from "@/lib/database/models/user.model";
// import Friend from '../../../lib/database/models/friend.model';


export async function POST(req:NextRequest)
{ 
  const body = await req.json();
  const {email} = body;
const {userId} = auth();
console.log("userId!!!!!!",userId);
  await connectDB();
      const res = await User.findOne({clerkId:userId});
     const userid = res._id.toString();

    const API_BASE_URL = process.env.MODE==="production"?'https://blinkchat-nu.vercel.app':'http://localhost:3000'
    const url = `${API_BASE_URL}/api/acceptinvite/${userid}?email=${email}`;
    const second_url = `${API_BASE_URL}/sign-up`
    const message = `Add friend in Blinkchat:- \n\n ${url} \n \n If first time user plz signUp first ${second_url} an then add friend`;
 
    try {


      const res = await sendEmail({ 
          email,
          subject: `Add friend in Blinkchat`,
          message
        })

      return NextResponse.json({"success":"true","mssg":`mail sent to ${email}`,"respp":`${JSON.stringify(res)}`},{status:200})
}

catch(error)
{ 
    return ErrorHandler(error);
}

}


// export async function GET(req:NextRequest)
// { 
//   await connectDB();
//  const ds = await Friend.find().populate({path:'invitedBy',model:'User'}); 
//  return NextResponse.json({"ds":ds},{status:200});
// }