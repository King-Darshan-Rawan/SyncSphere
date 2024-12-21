import React, { useState } from 'react';
import './ChatPage.css';

const ChatList = ({ users, onUserClick, searchTerm, onSearchChange }) => {
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-item" onClick={() => onUserClick(user)}>
            <div className="user-info">
              <img src={user.profilePic} alt={`${user.name}'s profile`} className="user-pic" />
              <span>{user.name}</span>
            </div>
            <button className="video-call-btn">📹</button>
          </div>
        ))}
      </div>
      <div className='chat-list-footer'>
        <button className="join-button bottom-spc">
          Join Team
        </button>
        <button className="create-button bottom-spc">
          Create Team
        </button>
      </div>
    </div>
  );
};

const ChatSection = ({ selectedUser, chatMessages, onSendMessage, onVoiceMessage }) => {
  const [messageText, setMessageText] = useState('');

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
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
                className={`chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}
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
            <button className= 'record-button' onClick={() => onVoiceMessage('Voice message attached!')}>🎤</button>
            <button className='send-button' onClick={handleSend}>Send</button>
          </div>
        </>
      ) : (
        <div className="no-chat">Select a user to start chatting</div>
      )}
    </div>
  );
};

const TaskTeam = () => {
  return (
    <>
    <div className="task-team">
    <div className="team">
    <div className='task-top'>
        <button className="join-button">
          Join Meet
        </button>
        <button className="create-button">
          Create Meet
        </button>
      </div>
    <div className="head"> <p className="titel-sub-cont"> Team</p></div>
    </div>
    <div className="task">
    <div className="head"> <p className="titel-sub-cont"> Task</p></div>
    </div>
    </div>
    </>
  );
};


const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const users = [
    { id: 1, name: 'JohnDoe', profilePic: 'https://via.placeholder.com/50' },
    { id: 2, name: 'JaneSmith', profilePic: 'https://via.placeholder.com/50' },
    { id: 3, name: 'User123', profilePic: 'https://via.placeholder.com/50' },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setChatMessages([
      { id: 1, text: `Hi, ${user.name}!`, sender: 'them' },
      { id: 2, text: 'Hello!', sender: 'me' },
    ]);
  };

  const handleSendMessage = (text) => {
    setChatMessages([...chatMessages, { id: chatMessages.length + 1, text, sender: 'me' }]);
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
      <TaskTeam/>
    </div>
  );
};

export default ChatPage;

