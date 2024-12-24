import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    chatName : { type : String , trim : true},
    isGroupChat : {type : Boolean , default : false},
    groupName : {type : String , default : null},
    users :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }],
    latestMessage: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",

    },
    GroupAdmin: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",

    },
});



const Chat = mongoose.model("Chat" , ChatSchema);


export {Chat}