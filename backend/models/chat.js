import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    sender: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    Users: [
        {
          oneToOneUser: [
            {
              User2: { type: String, required: true }, // Second user in one-to-one chat
              Message: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the Message collection
                ref: "Message",
              },
            },
          ],
        },
        {
          groupUsers: [
            {
              groupName: {
                type: String,
                default: null, // Group name for group chats
              },
              userId: { type: String, required: true }, // User ID in the group
              Message: {
                type: mongoose.Schema.Types.ObjectId, // Reference to the Message collection
                ref: "Message",
              },
            },
          ],
        },
      ],
}, {
    timestamps: true,
});

const Chat = mongoose.model("Chat", ChatSchema);

export { Chat };
