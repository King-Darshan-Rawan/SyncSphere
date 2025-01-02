import { Chat } from "../models/chat.js";

// Create one-on-one chat if it doesn't exist
const createOneToOneChat = async (req, res) => {
  const { sender, receiver } = req.body;

  try {
    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender and receiver must be provided." });
    }

    console.log(sender, receiver);

    // Check if there's an existing chat between the sender and receiver
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      sender,
      "Users.oneToOneUser.User2": receiver,
    });

    console.log(existingChat);

    if (existingChat) {
      // If the chat exists, directly return it without creating a new one
      return res.status(200).json(existingChat);
    }

    console.log("Creating new chat...");

    // If no existing chat is found, create a new one
    const newChat = await Chat.create({
      sender: sender,
      Users: [{ oneToOneUser: [{ User2: receiver }] }], 
    });

    console.log(newChat);

    return res.status(201).json(newChat); // Respond with the new chat creation
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message }); // Ensure error response is the last
  }
};



// Fetch one to one chats for a user
const fetchOneToOneChats = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Query to find all one-to-one chats involving the user as either sender or receiver
    const oneToOneChats = await Chat.find({
      isGroupChat: false,
      $or: [
        { sender: userId },
        { "Users.oneToOneUser.User2": userId }
      ]
    }).populate("Users.oneToOneUser.Message");

    if (!oneToOneChats.length) {
      return res.status(404).json({ message: "No chats found for this user." });
    }

    res.status(200).json(oneToOneChats);
  } catch (error) {
    console.error("Error fetching one-to-one chats:", error.message);
    res.status(500).json({ error: error.message });
  }
};



//fetch chat by ID
const fetchChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate("Users.oneToOneUser.Message").populate("Users.groupUsers.Message");

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    console.log("✅ Chat successfully created or retrieved:", chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Create group chat
const createGroupChat = async (req, res) => {
  try {
    const { groupName, users } = req.body;

    if (!groupName || !users || users.length < 2) {
      return res.status(400).json({ error: "Group must have a name and at least 2 members." });
    }

    const newGroupChat = new Chat({
      isGroupChat: true,
      Users: [{ groupUsers: users.map((user) => ({ type: user, groupName })) }],
    });

    const savedGroupChat = await newGroupChat.save();
    res.status(201).json(savedGroupChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//fetch group chat 
const fetchGroupChats = async (req, res) => {
  try {
    const groupChats = await Chat.find({ isGroupChat: true }).populate("Users.groupUsers.Message");
    res.status(200).json(groupChats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Rename a group chat
// const renameGroup = async (req, res) => {
//   const { chatId, chatName } = req.body;

//   try {
//     const chat = await Chat.findByIdAndUpdate(
//       chatId,
//       { groupName: chatName },
//       { new: true }
//     );

//     res.status(200).json(chat);
//   } catch (error) {
//     res.status(400).json({ msg: "Error in renaming the group" });
//   }
// };

// Remove a user from a group
const removeUserFromGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { $pull: { "Users.groupUsers": { type: userId } } },
      { new: true }
    ).populate("Users.groupUsers.Message");

    if (!updatedGroupChat) {
      return res.status(404).json({ error: "Group chat not found." });
    }

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a user to a group
const addUserToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const updatedGroupChat = await Chat.findByIdAndUpdate(
      chatId,
      { $addToSet: { "Users.groupUsers": { type: userId } } },
      { new: true }
    ).populate("Users.groupUsers.Message");

    if (!updatedGroupChat) {
      return res.status(404).json({ error: "Group chat not found." });
    }

    res.status(200).json(updatedGroupChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export{
  createGroupChat,
  createOneToOneChat,
  fetchChatById,
  fetchOneToOneChats,
  fetchGroupChats,
  addUserToGroup,
  removeUserFromGroup
};
