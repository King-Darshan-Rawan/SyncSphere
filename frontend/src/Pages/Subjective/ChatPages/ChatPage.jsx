import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { GoMoveToEnd, GoMoveToStart } from "react-icons/go";
import { FaMicrophoneAlt } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import ChatList from "./ChatList";
// Decode the token (use a library like jwt-decode)
import {jwtDecode} from "jwt-decode";
// import {accessChat} from "./../../../../../backend/controller/chat"
const socket = io("http://localhost:3001"); // Adjust to your backend socket URL

// Chat Section (Right Side)
const ChatSection = ({
  selectedUser,
  chatMessages,
  onSendMessage,
  onVoiceMessage,
}) => {
  const [messageText, setMessageText] = useState("");

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText("");
    }
  };

  return (
    <div className="chat-section">
      {selectedUser ? (
        <>
          <div className="chat-header">Chatting with: {selectedUser.name}</div>
          <div className="chat-messages">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${
                  msg.sender === "me" ? "sent" : "received"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <textarea
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            ></textarea>
            <button
              className="record-button"
              onClick={() => onVoiceMessage("Voice message attached!")}
            >
              <FaMicrophoneAlt />
            </button>
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="no-chat">Select a user to start chatting</div>
      )}
    </div>
  );
};

// Task and Team Sidebar (Right Bottom)
const TaskTeam = () => {
  const [sidebar, setSidebar] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setIsActive(!isActive);
  };

  return (
    <div className="chatmain-container">
      <div className="hider-container">
        <button
          onClick={toggleSidebar}
          className={`hider ${sidebar ? "sidebar-open" : "sidebar-closed"}`}
        >
          {sidebar ? <GoMoveToEnd /> : <GoMoveToStart />}
        </button>
      </div>
      <div
        className={`task-team ${
          isActive ? "active-sidebar" : "inactive-sidebar"
        }`}
      >
        <div className="team">
          <div className="task-top">
            <button className="join-button">Join Meet</button>
            <button className="create-button">Create Meet</button>
          </div>
          <div className="head">
            <p className="titel-sub-cont">Team</p>
          </div>
        </div>
        <div className="task">
          <div className="head">
            <p className="titel-sub-cont">Task</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Chat Page
const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chat, setChat] = useState(null); // Stores chat object
  const [userChats, setUserChats] = useState([]); // Stores all chats for the user

  // Assuming the token is stored in localStorage
  
  const token = localStorage.getItem("token");
  let loggedInUserId;
  if (token) {
    const decoded = jwtDecode(token);
    loggedInUserId = decoded.userId; // Adjust key based on your JWT payload
  }
  

  // ✅ Fetch all chats when the page loads
  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        console.log("📡 Fetching user chats...");
        const response = await axios.post("http://localhost:3001/chat/fetchChat", {
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
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message received");
    };
  }, []);

//send message 
  useEffect(() => {
    const messageListener = (newMessage) => {
      console.log("📩 New message received:", newMessage);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    };
  
    socket.on("messageReceived", messageListener);
  
    return () => {
      socket.off("messageReceived", messageListener);
    };
  }, []);
  
  
  
  // ✅ Handle user selection and chat access/creation
  const handleUserClick = async (user) => {
    setSelectedUser(user);
  
    try {
      const response = await axios.post("http://localhost:3001/chat/createChat", {
        loggedInUserId,
        userId: user.id,
      });
  
      const chatData = response.data;
      console.log("✅ Chat Data:", chatData);
  
      setChat(chatData); // Set chat object
    } catch (error) {
      console.error("❌ Error accessing or creating chat:", error.response?.data || error.message);
      setChat(null); // Reset chat object
      alert("Failed to create or access chat.");
    }
  };
  

  // ✅ Handle sending messages
  const handleSendMessage = async (text) => {
    if (!chat || !chat._id) {
      console.error("❌ Chat is not initialized");
      alert("Please select or create a chat first.");
      return;
    }
  
    try {
      const newMessage = {
        chatId: chat._id,
        sender: loggedInUserId,
        text,
      };
  
      // Emit the message via socket or API
      socket.emit("send message", newMessage);
  
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text, sender: "me" },
      ]);
    } catch (error) {
      console.error("❌ Error sending message:", error.response?.data || error.message);
      alert("Failed to send the message.");
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

export default ChatPage ;
