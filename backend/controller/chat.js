import {Chat} from "../models/chat.js";

// create one on one chat if previous does not exist
let accessChat = async(req,res)=>{
    let {loggedInUserId , userId} = req.body;
    console.log(loggedInUserId , userId);

    try{
        console.log("");
        let chat = await Chat.findOne({
            isGroupChat: false,
            users: { $all: [userId, loggedInUserId] },
        }).populate("users", "username");

        if(!chat){
            const Chat = await Chat.insertMany({
                chatName: "One-on-One Chat",
                user:[userId,loggedInUserId]});
        }
        res.status(200).json(chat);
    }catch(err){
        res.status(400).json({msg:"error accessing Chat"});
    }
}
// check for previous chat
let fetchChat = async(req,res)=>{
    let {loggedInUserId} = req.headers;
    try {
        const chats = await Chat.find({ users: { $in: [loggedInUserId] } })
          .populate("users", "username")
          .populate("groupAdmin", "username");
        res.status(200).json(chats);
      }catch (error) {
        res.status(500).json({ error: "Error fetching chats" });
      }
}
//create group chat
let createGroupChat = async(req,res)=>{
    let {groupName , users} = req.body;
    let {loggedInUserId} = req.headers;

    try{
        const groupChat = await Chat.create({
            chatName: groupName,
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
        const chat = await Chat.findByIdAndUpdate(chatId, { chatName:  chatName}, { new: true });
        res.status(200).json(chat);
    }catch(error){
        res.status(400).json({msg:"error in renaming"});

    } 
}
//remove from group
let removeFromGroup = async(req,res)=>{
    let {chatId , userToBeremoved} = req.body;
    try{
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userToBeremoved } },
            { new: true }
          ).populate("users", "username");
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
            chatId,
            { $push: { users: newUser } },
            { new: true }
          ).populate("users", "username");
        res.status(200).json(chat);
    }catch(error){
        res.status(400).json({msg:"error adding a user in group"});

    } 
}

export {accessChat,fetchChat,createGroupChat,renameGroup,removeFromGroup,addtoGroup};