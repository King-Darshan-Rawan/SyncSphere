import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    users :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    latestMessage: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",

    },
});



const Chat = mongoose.model("Chat" , ChatSchema);


export {Chat}