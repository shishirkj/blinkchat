import { Schema,models,model} from "mongoose";

const messageSchema = new Schema({ 
    senderId:{ 
        type:String,
        required:[true,"senderId missing"]
    },
    receiverId:{ 
        type:String,
        required:[true,"receiverId missing"]
    },
    messageArray: [{
        message: { type: String, required: true },
        messageId: { type: String, required: true }
    }]
})

const Message = models?.Friend||model("Message", messageSchema);

export default Message