import { Schema,models,model} from "mongoose";
import mongoose from "mongoose";

const FriendSchema = new Schema({
    firstName:{ type: String, required:[true,"Please Enter firstName"] },
    lastName:{ type: String, required:[true,"Please Enter lastName"] },
    emailId:{type:String,required:[true,"Please enter emailId"]},
    email: { type: String,unique:true, required:[true,"Please Enter emailId"] },
    photo:{type:String,default:"https://w0.peakpx.com/wallpaper/506/344/HD-wallpaper-rick-and-morty-in-outer-space.jpg"},
    invitedBy:{ type: Schema.Types.ObjectId,ref:"User",required:true}
});

mongoose.models = {};

const Friend = models.Friend||model("Freind", FriendSchema);

export default Friend