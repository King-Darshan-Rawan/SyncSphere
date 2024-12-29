import { Chat } from "../models/chat.js";

// Create one-on-one chat if it doesn't exist
const createOneToOneChat = async (req, res) => {
  
    const { sender, receiver } = req.body;
    try {

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender and receiver must be provided." });
    }

    console.log(sender , receiver);

    const existingChat = await Chat.findOne({
      isGroupChat: false,
      sender
      // ,"Users.oneToOneUser.type": receiver,
    });

    console.log({existingChat:existingChat});

    if (existingChat) {
  
      const existingChatwithUser2 = await Chat.findOne({
        isGroupChat: false,
        sender:sender,
        "Users.oneToOneUser.User2": receiver,
        // Users:[{oneToOneUser:[{User2:receiver}]}],
      });

      console.log({existingChatwithUser2:existingChatwithUser2});

      if(existingChatwithUser2){
        return res.status(200).json(existingChat);
      }

      const createOnetoOne = await Chat.findOneAndUpdate(
      { sender: sender, isGroupChat: false },
      {
       $push: { "Users.0.oneToOneUser": { User2: receiver } }
      },
      { new: true, runValidators: true }
      )
      console.log({createOnetoOne:createOnetoOne});
      return res.status(200).json(createOnetoOne);
    }

    const newChat = await Chat.insertMany({
      sender : sender,
      Users: [{ oneToOneUser: [{ User2:receiver }] }],
    });
    console.log({newChat:newChat});

    // const savedChat = await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch one to one chats for a user
const fetchOneToOneChat = async (req, res) => {
  const { sender, receiver } = req.body;

  try {
    // Ensure both sender and receiver are provided
    if (!sender || !receiver) {
      return res.status(400).json({ error: "Sender and receiver must be provided." });
    }

    // Find the chat where the sender and receiver are part of the 'oneToOneUser' array
    const existingChat = await Chat.findOne({
      isGroupChat: false, // Ensure it's not a group chat
      sender: sender,  // The sender of the message
      "Users.oneToOneUser.User2": receiver,  // The second user (receiver) in the one-to-one chat
    }).populate("Users.oneToOneUser.Message"); // Populate the messages for the one-to-one user

    // If no chat is found, return a 404 error
    if (!existingChat) {
      return res.status(404).json({ message: "One-to-one chat not found." });
    }

    // Send the existing chat as the response
    return res.status(200).json(existingChat);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
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
  fetchOneToOneChat,
  fetchGroupChats,
  addUserToGroup,
  removeUserFromGroup
};
