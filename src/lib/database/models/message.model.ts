import { Schema,models,model} from "mongoose";
import mongoose from "mongoose";
const MessageSchema = new Schema({ 
    senderId:{ 
        type:String,
        required:[true,"senderId missing"]
    },
    receiverId:{ 
        type:String,
        required:[true,"receiverId missing"]
    },
    roomId:{ 
        type:String,
        required:[true,"plz enter roomId"]
    },
    messageArray: [{type: String, required: true}]
})


const Message = models.message||model("message", MessageSchema);

export default Message