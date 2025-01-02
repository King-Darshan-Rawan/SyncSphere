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

    return res.status(201).json(newChat); // Respond with the new chat creation
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message }); // Ensure error response is the last
  }
};



// Fetch one to one chats for a user
const fetchOneToOneChat = async (req, res) => {
  let {sender} = req.body;
  try {
    // Fetch all chats
    const chats = await Chat.find({sender:sender})
    .populate({
      path: "Users.oneToOneUser.Message",
      select: "text createdAt",
      options: { strictPopulate: false }, // Ensure no error if empty
    })
    .populate({
      path: "Users.groupUsers.Message",
      select: "text createdAt",
      options: { strictPopulate: false }, // Ensure no error if empty
    })
      .lean(); // Convert Mongoose documents to plain objects

<<<<<<< HEAD
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
=======
    // Structure the response
    const response = Object.values(
      chats.reduce((acc, chat) => {
        // If sender is not already in the accumulator, initialize it
        if (!acc[chat.sender]) {
          acc[chat.sender] = {
            sender: chat.sender,
            isGroupChat: chat.isGroupChat,
            oneToOneUsers: [],
            groupUsers: [],
          };
        }
    
        // Merge oneToOneUsers
        acc[chat.sender].oneToOneUsers.push(
          ...(chat.Users[0]?.oneToOneUser.map((user) => ({
            userName: user.User2,
            latestMessage: user.latestMessage || null,
          })) || [])
        );
    
        // Merge groupUsers
        acc[chat.sender].groupUsers.push(
          ...(chat.Users[1]?.groupUsers.map((group) => ({
            groupName: group.groupName,
            userId: group.userId,
            latestMessage: group.Message?.text || null,
          })) || [])
        );
    
        return acc;
      }, {})
    );

    response.forEach((entry) => {
      const seen = new Set();
      entry.oneToOneUsers = entry.oneToOneUsers.filter((user) => {
        const key = user.userName; // Use `userName` as a unique identifier
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
    });

    console.log(response);

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching users with latest messages:", error);
    return res.status(500).json({ error: error.message });
>>>>>>> 154d1669b2f70d499a9bd0a462e619c61383a2ad
  }
}



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
