import { Schema,models,model} from "mongoose";

const FriendSchema = new Schema({
    clerkId: { type: String, required:true },
    email: { type: String, required:[true,"Please Enter emailId"] },
    username: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    invitedBy:{ type: Schema.Types.ObjectId,ref:"User",required:true}
});


const Friend = models?.Friend||model("Freind", FriendSchema);

export default Friend