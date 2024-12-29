import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";

let sendMessage = async (req, res) => {
    const { chatId, text, senderId } = req.body;
  
    if (!chatId || !text || !senderId) {
      console.error("❌ Invalid message data:", req.body);
      return res.status(400).json({ msg: "All fields are required (chatId, text, senderId)" });
    }
  
    try {
      // Check if the chat exists
      const chat = await Chat.findById(chatId);
      if (!chat) {
        console.error("❌ Chat not found:", chatId);
        return res.status(404).json({ msg: "Chat not found" });
      }
  
      // Create and save the message
      const newMessage = await Message.create({
        chatId,
        senderId,
        text,
      });
  
      console.log("✅ Message created:", newMessage);
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("❌ Error sending message:", error.message);
      res.status(500).json({ msg: "Server error while sending message", error: error.message });
    }
  };
  

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