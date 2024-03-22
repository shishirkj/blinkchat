import { NextRequest,NextResponse } from "next/server"
import connectDB from "@/lib/database/mongoose";
import Friend from "@/lib/database/models/friend.model";
import { ErrorHandler } from "@/lib/utils";
import { ObjectId } from "bson";
import User from "@/lib/database/models/user.model";



export async function GET(req:NextRequest,context:contextParams){ 
try {


    if(!context.params.userid)
    { 
    return NextResponse.json({"success":"false","mssg":"No userParams or emailParams"},{status:500})
    }
    const {searchParams} = new URL(req.url);
console.log(searchParams);

const email = searchParams.get("email");

if(!email)
{ 
    return NextResponse.json({"success":"false","mssg":"email missing"},{status:500});
}
await connectDB();

//res is the data(from User collection) who is going to become friend and we take username and photo 
    const res = await User.findOne({email:email})
    // if friend has not completed sign-up process
    if(!res)
    {
        return NextResponse.json({"success":"false","mssg":"Please sign Up first"},{status:500});
    }

console.log("res",res);

    const {userid} = context.params;
    console.log("ddasdsa!!!!!!",userid);
    var id=  new ObjectId(userid);
    console.log("id!!!!!!!!!",id)
    const eId = res._id.toString();
    const friend = { 
        firstName:res.firstName,
        lastName:res.lastName,
        emailId:eId,
        email,
        photo:res.photo,
        invitedBy:id
    }

    await Friend.create(friend);
//    const ds =  await Friend.find({}).populate('invitedBy')
//    console.log(ds);
    return NextResponse.json({"success":"false","mssg":friend},{status:200});

} catch (error) {
     return ErrorHandler(error);
}

}

// await connectDB();
// const friend = { 
//     email
// }
// await Friend.create()