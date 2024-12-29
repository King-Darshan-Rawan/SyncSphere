import { Chat } from "./../models/chat";

// Create one-on-one chat if it doesn't exist
const createChat = async (req, res) => {
  const { loggedInUserId, userId } = req.body;

  if (!userId || !loggedInUserId) {
    return res.status(400).json({ msg: "Invalid user data" });
  }

  try {
    let chat = await Chat.findOne({
      isGroupChat: false,
      oneToOneUsers: { $all: [userId, loggedInUserId] },
    })
      .populate("latestMessage")
      .populate("oneToOneUsers", "userId name profilePic"); // Populate relevant user fields

    if (!chat) {
      chat = await Chat.create({
        chatName: "One-on-One Chat",
        isGroupChat: false,
        oneToOneUsers: [userId, loggedInUserId],
      });

      chat = await chat.populate("oneToOneUsers", "userId name profilePic");
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ msg: "Server error while accessing/creating chat" });
  }
};

// Fetch all chats for a user
const fetchChat = async (req, res) => {
  const { loggedInUserId } = req.body;

  if (!loggedInUserId) {
    return res.status(400).json({ msg: "User ID is required to fetch chats." });
  }

  try {
    const chats = await Chat.find({
      oneToOneUsers: { $in: [loggedInUserId] },
    })
      .populate("oneToOneUsers", "userId name profilePic") // Populate user details
      .populate("latestMessage");

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error.message);
    res.status(500).json({ msg: "Server error while fetching chats" });
  }
};

// Create group chat
const createGroupChat = async (req, res) => {
  const { groupName, users, loggedInUserId } = req.body;

  try {
    const groupChat = await Chat.create({
      chatName: "Group Chat",
      groupName: groupName,
      isGroupChat: true,
      users: [...users, loggedInUserId],
      groupAdmin: loggedInUserId,
    });

    res.status(201).json(groupChat);
  } catch (error) {
    res.status(400).json({ msg: "Error in creating group chat" });
  }
};

// Rename a group chat
const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { groupName: chatName },
      { new: true }
    );

    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ msg: "Error in renaming the group" });
  }
};

// Remove a user from a group
const removeFromGroup = async (req, res) => {
  const { chatId, userToBeRemoved } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { users: userToBeRemoved } },
      { new: true }
    );

    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ msg: "Error in removing user from group" });
  }
};

// Add a user to a group
const addToGroup = async (req, res) => {
  const { chatId, newUser } = req.body;

  try {
    const chat = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: newUser } },
      { new: true }
    ).populate("users", "userId name profilePic");

    res.status(200).json(chat);
  } catch (error) {
    res.status(400).json({ msg: "Error in adding user to group" });
  }
};

export default{
  createChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
