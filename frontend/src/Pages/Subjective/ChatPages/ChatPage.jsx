import React, { useEffect, useState } from "react";
import "./ChatPage.css";
import { GoMoveToEnd } from "react-icons/go";
import { GoMoveToStart } from "react-icons/go";
import { FaMicrophoneAlt } from "react-icons/fa";
import axios from "axios";
import ChatList from "./ChatList";

//FetchChat = chatlist
//left segment

//right top
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
          <div className="chat-header">{selectedUser.name}</div>
          <div className="chat-messages">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
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
//right bottom
const TaskTeam = () => {
  const [sidebar, setSidebar] = useState(true);
  const [isActive, setIsActive] = useState(true); // State for dynamic class

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setIsActive(!isActive); // Toggle the active class state
  };

  return (
    <>
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
              {" "}
              <p className="titel-sub-cont"> Team</p>
            </div>
          </div>
          <div className="task">
            <div className="head">
              {" "}
              <p className="titel-sub-cont"> Task</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
//center
const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chat, setChat] = useState(null); // Store chat object here

  const users = [
    { id: 1, name: "JohnDoe", profilePic: "https://via.placeholder.com/50" },
    { id: 2, name: "JaneSmith", profilePic: "https://via.placeholder.com/50" },
    { id: 3, name: "User123", profilePic: "https://via.placeholder.com/50" },
  ];

  // Function to fetch or create a chat when a user is selected
  const handleUserClick = async (user) => {
    setSelectedUser(user);

    try {
      // Replace 'loggedInUserId' with the actual logged-in user's ID (you should have this stored)
      const loggedInUserId = "currentLoggedInUserId"; // Example placeholder, change accordingly
      const response = await axios.post("/api/chat/accessChat", {
        loggedInUserId,
        userId: user.id,
      });

      const chatData = response.data; // The chat data returned from the backend
      setChat(chatData); // Update the chat state with the new chat
      setChatMessages([
        { id: 1, text: `Hi, ${user.name}!`, sender: "them" },
        { id: 2, text: "Hello!", sender: "me" },
      ]);
    } catch (error) {
      console.error("Error accessing or creating chat:", error);
    }
  };

  const handleSendMessage = (text) => {
    setChatMessages([
      ...chatMessages,
      { id: chatMessages.length + 1, text, sender: "me" },
    ]);
  };

  return (
    <div className="chat-page">
      <ChatList
        users={users}
        onUserClick={handleUserClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <ChatSection
        selectedUser={selectedUser}
        chatMessages={chatMessages}
        onSendMessage={handleSendMessage}
        onVoiceMessage={(msg) => console.log(msg)}
      />
      <TaskTeam />
    </div>
  );
};

export default ChatPage;
