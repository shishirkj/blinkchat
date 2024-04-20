import { NextRequest,NextResponse } from "next/server"
import connectDB from "@/lib/database/mongoose";
import Friend from "@/lib/database/models/friend.model";
import { ErrorHandler } from "@/lib/service";
import { ObjectId } from "bson";
import User from "@/lib/database/models/user.model";


//id is by whom invited by and email who we r inviting
// http://localhost:3000/api/acceptinvite/65f6fe4e98e0cd031b4fb365?email=skjskjskj333@gmail.com


export async function GET(req:NextRequest,context:contextParams){ 
try {


    if(!context.params.userid)
    { 
    return NextResponse.json({"success":"false","mssg":"No userParams or emailParams"},{status:500})
    }
    const {searchParams} = new URL(req.url);


const email = searchParams.get("email");

if(!email)
{ 
    return NextResponse.json({"success":"false","mssg":"email missing"},{status:500});
}
await connectDB();

//res is the data(from User collection) who is going to become friend and we take username and photo 
console.log("email!!!!",email)
    const res = await User.findOne({email:email})
    // if friend has not completed sign-up process
    if(!res)
    {
        return NextResponse.json({"success":"false","mssg":"Please sign Up first"},{status:500});
    }

   

    const {userid} = context.params;
    var id=  new ObjectId(userid);
   
    const invitedByWhom = await User.findById(id);
    
    const eId = res._id.toString();
    const friend = { 
        firstName:res.firstName,
        lastName:res.lastName,
        emailId:eId,
        email,
        photo:res.photo,
        invitedBy:id,
    }
   
    if(await Friend.findOne({email}))
    { 
        return NextResponse.json({"success":"false","mssg":"You have already accepted his Friend Request"},{status:500})
    }

    await Friend.create(friend);


    return NextResponse.json({"success":"true","mssg":friend,"invitedByPersonsname":invitedByWhom.firstName+""+invitedByWhom.lastName },{status:200});

} catch (error) {
     return ErrorHandler(error);
}

}

// await connectDB();
// const friend = { 
//     email
// }
// await Friend.create()
