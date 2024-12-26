// Socket.IO functionality
import { Message } from "../models/message.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // 📌 Join a chat room
    socket.on("joinRoom", (chatId) => {
      if (!chatId) {
        console.error(`❌ Invalid chatId: ${chatId}`);
        return;
      }
      socket.join(chatId);
      console.log(`🔗 User ${socket.id} joined room ${chatId}`);
    });

    // 📌 Handle sending messages
    socket.on("sendMessage", async ({ chatId, senderId, text }) => {
      if (!chatId || !senderId || !text) {
        console.error("❌ Invalid message data:", { chatId, senderId, text });
        return;
      }

      try {
        // Save the new message to the database
        const newMessage = await Message.create({
          chatId,
          senderId,
          text,
        });

        // Emit the message to all users in the room
        io.to(chatId).emit("receiveMessage", newMessage);

        console.log("📤 Message saved to DB and emitted:", newMessage);
      } catch (error) {
        console.error("❌ Error saving message:", error.message);
      }
    });

    // 📌 Handle typing notification
    socket.on("typing", (chatId) => {
      socket.to(chatId).emit("typing", socket.id);
    });

    socket.on("stopTyping", (chatId) => {
      socket.to(chatId).emit("stopTyping", socket.id);
    });

    // 📌 Handle user disconnect
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });
};
