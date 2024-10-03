import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ChatList from './ChatList'; 

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { sender: "John Doe", text: "Hello!" },
    { sender: "You", text: "Hi there!" },
    { sender: "Jane Smith", text: "How are you?" },
  ]);
  
  const [input, setInput] = useState("");
  const [chats] = useState([
    { name: "John Doe", lastMessage: "Hello!" },
    { name: "Jane Smith", lastMessage: "How are you?" },
    { name: "Chat Group", lastMessage: "Meeting at 5 PM" },
  ]);
  const [currentChat, setCurrentChat] = useState(chats[0]);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { sender: "You", text: input }]);
      setInput("");
    }
  };

  const handleSelectChat = (chat) => {
    setCurrentChat(chat);
    setMessages([{ sender: chat.name, text: chat.lastMessage }]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, height: "100vh" }}>
      {/* Sidebar - Chat List */}
      <ChatList chats={chats} onSelectChat={handleSelectChat} />

      {/* Main Chat Window */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: { xs: "auto", sm: "100vh" },  // Responsive height
        }}
      >
        <Typography variant="h6">{currentChat.name}</Typography>
        <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
          {messages.map((message, index) => (
            <Typography
              key={index}
              align={message.sender === "You" ? "right" : "left"}
              sx={{
                p: 1,
                backgroundColor: message.sender === "You" ? "#d1ffd1" : "#e0e0e0",
                borderRadius: "5px",
                mb: 1,
                maxWidth: "70%",
                alignSelf: message.sender === "You" ? "flex-end" : "flex-start",
              }}
            >
              {message.sender}: {message.text}
            </Typography>
          ))}
        </Box>

        {/* Message Input */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
