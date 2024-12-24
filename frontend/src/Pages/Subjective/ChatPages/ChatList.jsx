//can use 


import React, { useState } from "react";



const ChatList = ({ users, onUserClick }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [suggestions, setSuggestions] = useState([]); // Autosuggestions

  // Handle search term changes
  const handleSearchChange = (term) => {
    setSearchTerm(term);

    // Filter suggestions based on search term
    if (term.trim() !== "") {
      const matches = users.filter((user) =>
        user.username.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="chat-list">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Autosuggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="suggestion-item"
              onClick={() => {
                onUserClick(suggestion);
                setSearchTerm(""); // Clear search term
                setSuggestions([]); // Clear suggestions
              }}
            >
              {suggestion.username}
            </div>
          ))}
        </div>
      )}

      {/* User List */}
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-item"
            onClick={() => onUserClick(user)}
          >
            <div className="user-info">
              <img
                src={user.profilePic}
                alt={`${user.username}'s profile`}
                className="user-pic"
              />
              <span>{user.username}</span>
            </div>
            <button className="video-call-btn">📹</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
