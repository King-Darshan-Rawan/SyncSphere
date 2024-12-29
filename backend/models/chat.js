import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    // chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    Users: [
        {
            oneToOneUser :[{
                type: String,
                required: false,
                Message: {
                         type: mongoose.Schema.Types.ObjectId,
                         ref: "Message",
                }, 
        }]
        },
        {
            groupUsers :[{
                groupName: {
                    type: String, 
                    default: null 
                },
                type: String,
                required: false,
                Message: {
                             type: mongoose.Schema.Types.ObjectId,
                             ref: "Message",
                },
        }]
        }
    ],
}, {
    timestamps: true,
});

const Chat = mongoose.model("Chat", ChatSchema);

export { Chat };
