import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdAdd } from "react-icons/io";
import { GoDeviceCameraVideo } from "react-icons/go";

const ChatList = ({ onOpenChat }) => {
  const [users, setUsers] = useState([]); // Full list of users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users
  const [searchedUsers, setSearchedUsers] = useState([]); // Users from API search
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const loggedInUserId = "currentLoggedInUserId"; // Replace with actual logged-in user ID.

  // Fetch users from API based on search
  const searchUsers = async (searchQuery) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/search?search=${searchQuery}`
      );
      setSearchedUsers(response.data); // Store searched users
      setFilteredUsers(response.data); // Update filtered users
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  // Handle search term changes
  const onSearchChange = (query) => {
    setSearchTerm(query);
  };

  // Fetch initial user list on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users`);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("API endpoint not found: 404", error);
          alert("Users API endpoint not found. Please check your server configuration.");
        } else {
          console.error("Error fetching initial users:", error);
        }
      }
    };
    
    fetchUsers();
  }, []);

  // Trigger search when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchedUsers([]); // Clear searched users
      setFilteredUsers(users); // Reset to full user list
    } else {
      searchUsers(searchTerm.trim());
    }
  }, [searchTerm, users]);

  // Handle chat creation via API
  const createChat = async (userId, userName) => {
    try {
      console.log("Sending request to backend with:", {
        loggedInUserId,
        userId,
      });

      const response = await axios.post("http://localhost:3001/chat/createChat", {
        loggedInUserId,
        userId,
      });

      console.log("Chat created successfully:", response.data);

      // Open chat interface in ChatPage
      if (onOpenChat) {
        onOpenChat({ id: userId, name: userName });
      }
    } catch (error) {
      console.error("Error creating chat:", error.response?.data || error.message);
      alert("Failed to access chat. Please try again.");
    }
  };

  return (
    <div className="chat-list">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* User List */}
      <div className="user-list">
        {searchedUsers.length > 0
          ? searchedUsers.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <img
                    src={user.profilePic || "default-avatar.png"}
                    alt={`${user.name || "Unknown User"}'s profile`}
                    className="user-pic"
                  />
                  <span>{user.name || user.userId || "Unnamed User"}</span>
                </div>
                <button
                  className="action-btn"
                  onClick={() => {
                    console.log("Creating chat with user:", user);
                    if (user?.userId) {
                      createChat(user.userId, user.name || user.userId);
                    } else {
                      console.error("Error: userId is missing or undefined for:", user);
                    }
                  }}
                >
                  <IoMdAdd />
                </button>
              </div>
            ))
          : filteredUsers.map((user) => (
              <div key={user.id} className="user-item">
                <div className="user-info">
                  <img
                    src={user.profilePic || "default-avatar.png"}
                    alt={`${user.name || "Unknown User"}'s profile`}
                    className="user-pic"
                  />
                  <span>{user.name || user.userId || "Unknown User"}</span>
                </div>
                <button className="video-call-btn">
                  <GoDeviceCameraVideo />
                </button>
              </div>
            ))}
      </div>

      {/* Footer Buttons */}
      <div className="chat-list-footer">
        <button className="join-button bottom-spc">Join Team</button>
        <button className="create-button bottom-spc">Create Team</button>
      </div>
    </div>
  );
};

export default ChatList;
