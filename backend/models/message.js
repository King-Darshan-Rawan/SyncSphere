import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat", // Assuming you have a Chat model
        required: true,    
    },
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    },
    {
        timestamps: true
    },
);



const Message = mongoose.model("Message" , MessageSchema);


export {Message}