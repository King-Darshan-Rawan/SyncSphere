import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    // chatname:{
    //     type: String,
    //     required:true,
    // },
    // email :{
    //     type : String,
    //     required:true,
    // },
    // password :{
    //     type : String,
    //     required:true,
    // },
    // image:{
    //     url : String,
    //     filename : String,
    // },
    // linkedin:{
    //     type:String,
    // },
    // github:{
    //     type:String,
    // }
});



const Chat = mongoose.model("Chat" , ChatSchema);


export {Chat}