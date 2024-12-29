import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat", // Reference to the Chat collection
    required: true,
  },
  // senderId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User", // Reference to the User collection
  //   required: true,
  // },  
  receiverId: {
    type: String,
    required: true 
  },  
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model("Message", messageSchema);
