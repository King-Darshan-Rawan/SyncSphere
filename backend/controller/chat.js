import {Chat} from "../models/chat.js";

// create one on one chat if previous does not exist
const accessChat = async (req, res) => {
  console.log("🔍 Incoming request to accessChat:", req.body);

  const { loggedInUserId, userId } = req.body;

  if (!userId || !loggedInUserId) {
      console.error("❌ Invalid user data:", { loggedInUserId, userId });
      return res.status(400).json({ msg: "Invalid user data" });
  }

  try {
      console.log(`📡 Searching for one-to-one chat between ${loggedInUserId} and ${userId}`);

      // Search for one-to-one chat based on userId strings
      let chat = await Chat.findOne({
          isGroupChat: false,
          oneToOneUsers: { $all: [userId, loggedInUserId] }
      }).populate("latestMessage").populate("users");

      console.log("🛠️ Chat search result:", chat);

      if (!chat) {
          console.log("✨ No existing one-to-one chat found, creating a new chat...");
          chat = await Chat.create({
              chatName: "One-on-One Chat",
              isGroupChat: false,
              oneToOneUsers: [userId, loggedInUserId]
          });
      }

      console.log("✅ Chat found/created successfully:", chat);
      return res.status(200).json(chat);

  } catch (err) {
      console.error("❌ Server error while accessing/creating chat:", err.message);
      console.error("🛠️ Full error stack:", err.stack);
      return res.status(500).json({ msg: "Server error while accessing/creating chat" });
  }
};



// check for previous chat
let fetchChat = async(req,res)=>{
    // let {loggedInUserId} = req.headers;
    let {loggedInUserId} = req.body;
    try {
        const chats = await Chat.find({ users: { $in: [loggedInUserId] } })
          .populate("users", "username")
        //   .populate("groupAdmin", "username");
        res.status(200).json(chats);
      }catch (error) {
        res.status(500).json({ error: "Error fetching chats" });
      }
}
//create group chat
let createGroupChat = async(req,res)=>{
    let {groupName , users} = req.body;
    // let {loggedInUserId} = req.headers;
    let {loggedInUserId} = req.body;
    try{
        const groupChat = await Chat.create({
            chatName: "Group Chat",
            groupName: groupName,
            isGroupChat: true,
            users: [...users, loggedInUserId],
            groupAdmin: loggedInUserId,
        });
        res.status(201).json(groupChat);
    }catch(error){
        res.status(400).json({msg:"error in creating Group chat"});
    }
}
//rename a group
let renameGroup = async(req,res)=>{
    let {chatId , chatName} = req.body;
    try{
        const chat = await Chat.findByIdAndUpdate(chatId, { groupName:  chatName}, { new: true });
        res.status(200).json(chat);
    }catch(error){
        res.status(400).json({msg:"error in renaming"});

    } 
}
//remove from group
let removeFromGroup = async(req,res)=>{
    let {chatId , userToBeremoved} = req.body;
    console.log(chatId , userToBeremoved);
    try{
        console.log("1");
        const chat = await Chat.findByIdAndUpdate(
            { _id: chatId },
            { $pull: { users: userToBeremoved } },
            { new: true }
          );
        //   .populate("users", "username");
        console.log("2");
        console.log(chat);
        res.status(200).json(chat);
    }catch(error){
        res.status(400).json({msg:"error in removing a user"});

    } 
}
//add to group
let addtoGroup = async(req,res)=>{
    let {chatId , newUser} = req.body;
    try{
        const chat = await Chat.findByIdAndUpdate(
            { _id: chatId },
            { $push: { users: newUser } },
            { new: true }
          ).populate("users", "username");
        res.status(200).json(chat);
    }catch(error){
        res.status(400).json({msg:"error adding a user in group"});

    } 
}

export {accessChat,fetchChat,createGroupChat,renameGroup,removeFromGroup,addtoGroup};