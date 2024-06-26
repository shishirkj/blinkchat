import { Schema,models,model} from "mongoose";
import mongoose from "mongoose";
const MessageSchema = new Schema({ 
    roomId:{ 
        type:String,
        required:[true,"plz enter roomId"]
    },
    messageArray: [{type: String, required: true}]
})


const Message = models.message||model("message", MessageSchema);

export default Message