import {Chat} from "../models/chat.js";

// create one on one chat if previous does not exist
let accessChat = async (req, res) => {
    let { loggedInUserId, userId } = req.body;
  
    try {
      // Find the existing chat
      let chat = await Chat.findOne({
        isGroupChat: false,
        users: { $all: [userId, loggedInUserId] },
      }).populate("users", "username");
  
      // If chat doesn't exist, create a new one
      if (!chat) {
        chat = await Chat.create({
          chatName: "One-on-One Chat",
          users: [userId, loggedInUserId]
        });
        // Populate the newly created chat with user information
        chat = await chat.populate("users", "username").execPopulate();
      }
  
      // Return the chat, whether it's newly created or found
      res.status(200).json(chat);
    } catch (err) {
      res.status(400).json({ msg: "Error accessing chat" });
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