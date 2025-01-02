import React, { useState } from "react"; // Import useState
import { FaMicrophoneAlt } from "react-icons/fa";

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

export default ChatSection;
