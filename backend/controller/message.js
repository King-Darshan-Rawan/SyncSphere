import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";

const sendMessage = async (req, res) => {
    try {
      const { chatId, receiverId, text } = req.body;
  
      const newMessage = new Message({
        chatId,
        receiverId,
        text,
      });
  
      const savedMessage = await newMessage.save();
  
      // Optionally, you can update the Chat with the latest message
      const chat = await Chat.findByIdAndUpdate(
        chatId,
        { $set: { "Users.oneToOneUser.Message": savedMessage._id } },
        { new: true }
      );
  
      res.status(201).json(savedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const fetchMessages = async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await Message.find({ chatId });
  
      if (!messages.length) {
        return res.status(404).json({ error: "No messages found for this chat" });
      }
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const editMessage = async (req, res) => {
    try {
      const { messageId } = req.params;
      const { text } = req.body;
  
      const updatedMessage = await Message.findByIdAndUpdate(
        messageId,
        { text },
        { new: true }
      );
  
      if (!updatedMessage) {
        return res.status(404).json({ error: "Message not found" });
      }
  
      res.status(200).json(updatedMessage);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteMessage = async (req, res) => {
    try {
      const { messageId } = req.params;
  
      const deletedMessage = await Message.findByIdAndDelete(messageId);
  
      if (!deletedMessage) {
        return res.status(404).json({ error: "Message not found" });
      }
  
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export {sendMessage , fetchMessages , editMessage , deleteMessage};