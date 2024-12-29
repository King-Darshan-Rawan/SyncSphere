import { Message } from "../models/message.js";
import { Chat } from "../models/chat.js";

const sendMessage = async (req, res) => {
  const { chatId, receiver, text } = req.body;
  console.log(chatId , receiver , text);

  try {
    // Validate the required fields
    if (!chatId  || !receiver || !text) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new message
    const newMessage = await Message.create({
      chatId: chatId,
      receiverId: receiver,
      text: text,
    });



    // Find the chat and update it with the new message reference
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          "Users.0.oneToOneUser.$[elem].Message": newMessage._id,
        },
      },
      {
        new: true,
        arrayFilters: [{ "elem.User2": receiver }], // Update the specific one-to-one user
        runValidators: true,
      }
    );


    if (!updatedChat) {
      return res.status(404).json({ error: "Chat not found." });
    }

    // Respond with the newly created message
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
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