import { Schema,models,model} from "mongoose";
import mongoose from "mongoose";

const roomIdSchema = new Schema({
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
});



const RoomId = models.roomId||model("roomId", roomIdSchema);

export default RoomId