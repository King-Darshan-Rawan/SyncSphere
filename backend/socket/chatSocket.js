// Socket.IO functionality
import {Message} from "../models/message.js"

let socketio = (io) => {

// let chats = {}; // In-memory storage for chats

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a room
  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined room ${chatId}`);
  });

  // Handle sending messages
  socket.on("sendMessage", async ({ chatId, senderId, text }) => {
    try{
        const newMessage = await Message.create({
            chatId: chatId,
            senderId: senderId,
            text: text,
    })

    io.to(chatId).emit("receiveMessage", newMessage);

    console.log("Message saved to db:", newMessage);


    // const message = { sender, text, timestamp: new Date() };
    // if (!chats[chatId]) chats[chatId] = [];
    // chats[chatId].push(message);

    // Emit message to everyone in the room
    }catch(error){
        console.error("Error saving message:", error);
    }

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});
})
}

export {socketio};