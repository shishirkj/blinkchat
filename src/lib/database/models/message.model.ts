import { Schema,models,model} from "mongoose";
import mongoose from "mongoose";
const messageSchema = new Schema({ 
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

mongoose.models = {};
const Message = models.Friend||model("Message", messageSchema);

export default Message