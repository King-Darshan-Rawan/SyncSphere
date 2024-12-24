import React, { useState } from "react";
 // Add this if you want styles specific to ChatSection

const ChatSection = ({ selectedUser, chatMessages, onSendMessage, onVoiceMessage }) => {
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
                className={`chat-message ${msg.sender === "me" ? "sent" : "received"}`}
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
            <button className="record-button" onClick={() => onVoiceMessage("Voice message attached!")}>
              🎤
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
