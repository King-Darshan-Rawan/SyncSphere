import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { GoMoveToEnd, GoMoveToStart } from "react-icons/go";
import { FaMicrophoneAlt } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import ChatList from "./ChatList";
// import accessChat from "./../../../../../backend/controller/chat"
const socket = io("http://localhost:3001"); // Adjust to your backend socket URL
// Chat Section (Right Side)
import ChatSection from "./ChatSection";
// Task and Team Sidebar (Right Bottom)
import TaskTeam from "./TaskTeam"

// Main Chat Page
const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chat, setChat] = useState(null); // Stores chat object
  const [userChats, setUserChats] = useState([]); // Stores all chats for the user

  const loggedInUserId = localStorage.getItem("userId"); // Replace with actual logged-in userId

  // ✅ Fetch all chats when the page loads
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        console.log("📡 Fetching user chats...");
        const response = await axios.post("http://localhost:3001/chat/fetchOneToOneChats", {
          loggedInUserId,
        });
        console.log("✅ User Chats Fetched:", response.data);
        setUserChats(response.data);
      } catch (error) {
        console.error("❌ Error fetching chats:", error.response?.data || error.message);
      }
    };

    fetchUserChats();
  }, []);

  // ✅ Join Chat Room with Socket.IO
  // ✅ Join Chat Room with Socket.IO
useEffect(() => {
  if (chat?._id) {
    socket.emit("join chat", chat._id);
    console.log(`📡 Joined chat room: ${chat._id}`);
  }
}, [chat]);


  // ✅ Listen for Incoming Messages
  useEffect(() => {
    socket.on("message received", (newMessage) => {
      console.log("📩 New message received:", newMessage);
      setChatMessages((prevMessages) =>
        [...prevMessages, newMessage].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      );      
    });

    return () => {
      socket.off("message received");
    };
  }, []);


  useEffect(() => {
    const messageListener = (newMessage) => {
      console.log("📩 New message received:", newMessage);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on("message received", messageListener);
  
    return () => {
      socket.off("message received", messageListener);
    };
  }, []);
  
  
  
  
  // ✅ Handle user selection and chat access/creation
  const handleUserClick = async (user) => {
    setSelectedUser(user);
    try {
      console.log(`📡 Fetching/Creating chat with ${user.userId}`);
      const response = await axios.post("http://localhost:3001/chat/createOneToOneChat", {
        loggedInUserId,
        userId: user.id,
      });
  
      const chatData = response.data;
      console.log("✅ Chat Data", chatData);
  
      setChat(chatData); // Set chat object
      const fetchedMessages = chatData.messages || [];
      setChatMessages(
        fetchedMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      );
  
      socket.emit("join chat", chatData._id);
    } catch (error) {
      console.error("❌ Error accessing or creating chat:", error.response?.data || error.message);
    }
  };
  
  

  // ✅ Handle sending messages
  const handleSendMessage = async (text) => {
    if (!chat || !chat._id) {
      console.error("❌ Cannot send message: No chat is selected.");
      return;
    }
  
    try {
      const newMessage = {
        chatId: chat._id, // Ensure chat._id exists
        sender: loggedInUserId,
        text,
      };
  
      socket.emit("send message", newMessage);
  
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text, sender: "me", timestamp: new Date().toISOString() },
      ]);
    } catch (error) {
      console.error("❌ Error sending message:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="chat-page">
      {/* Left Sidebar (User List) */}
      <ChatList
        onOpenChat={handleUserClick}
        chats={userChats}
        loggedInUserId={loggedInUserId}
      />

      {/* Chat Section */}
      <ChatSection
        selectedUser={selectedUser}
        chatMessages={chatMessages}
        onSendMessage={handleSendMessage}
        onVoiceMessage={(msg) => console.log(msg)}
      />

      {/* Task and Team Sidebar */}
      <TaskTeam />
    </div>
  );
};

export default ChatPage;
