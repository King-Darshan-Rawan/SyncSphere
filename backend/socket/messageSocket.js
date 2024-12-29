// Socket.IO functionality
import { Message } from "../models/message.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // 📌 Join a chat room
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`🔗 User ${socket.id} joined room ${chatId}`);
    });

    // 📌 Handle sending messages
    socket.on("sendMessage", async ({ chatId, senderId, text }, callback) => {
      try {
        const newMessage = await Message.create({
          chatId: chatId,
          senderId: senderId,
          text: text,
        });

        // Emit the message to all users in the room
        io.to(chatId).emit("receiveMessage", newMessage);

        // Send acknowledgment to the sender
        callback({
          status: "success",
          message: "Message sent successfully",
          data: newMessage,
        });

        console.log("📤 Message saved to DB and emitted:", newMessage);
      } catch (error) {
        console.error("❌ Error saving message:", error.message);

        // Send error acknowledgment to the sender
        callback({
          status: "error",
          message: "Failed to send the message",
          error: error.message,
        });
      }
    });

    // 📌 Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};
