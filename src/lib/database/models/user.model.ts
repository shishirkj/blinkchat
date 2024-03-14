import { Schema,Document,models,model} from "mongoose";
import { z } from "zod";

export const userParams = z.object({ 
    clerkId:z.string().min(3),
    email:z.string().min(3),
    username:z.string().optional(),
    firstName:z.string().min(3),
    lastName:z.string(),
    photo:z.string(),
    creditBalance:z.number().optional()
})


export type userParamsType = z.infer<typeof userParams>

interface UserDocument extends userParamsType, Document {}


const UserSchema = new Schema<UserDocument>({

    clerkId: { type: String, required: true },
    email: { type: String, required: [true,"please enter email id"] },
    username: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String, required: true },
    creditBalance: { type: Number,default:10}
});

const User = models?.User||model("User", UserSchema);

export default User