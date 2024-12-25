import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String, default: null },

    // Users participating in the chat (Referencing by _id)
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    // For one-on-one chats, store userId strings directly
    oneToOneUsers: [
        {
            type: String, // userId as a string (e.g., "Antairo")
            required: false,
        }
    ],

    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },

    GroupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

const Chat = mongoose.model("Chat", ChatSchema);

export { Chat };
