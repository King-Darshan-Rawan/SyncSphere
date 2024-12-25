import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";

let sendMessage = async(req,res)=>{
    let {chatId , text , senderId} = req.body;

    try{
        let chat = await Chat.find({_id:chatId});
        let saveMsg =null;
        console.log(chat);
        if(chat){
            saveMsg = await Message.create({chatId,text,senderId});
        }
        console.log(saveMsg);
        res.status(201).json(saveMsg);

    }catch(error){
        res.status(400).json({msg:"error in sending message"});
    }

}

let fetchMessage = async(req,res)=>{
    let {chatId} = req.params;
    try{
        let chat = await Chat.find({_id:chatId});
        if(chat){
            let msg = await Message.find

        }else{
            res.status(400).json({msg:"first create a chat"});
        }

    }catch(error){
        res.status(400).json({msg:"error is fetching messages"});
    }
}

let editMessage = async(req,res)=>{
    
}

let deleteMessage = async(req,res)=>{
    
}

export {sendMessage , fetchMessage , editMessage , deleteMessage};