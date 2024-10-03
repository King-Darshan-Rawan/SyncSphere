import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema({
    owner :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    wsname:{
        type:String,
        required:true,

    },
    wspassword:{
        type:String,
        required:true,
    },
    members:{
        type:Array,
        minItems: 0,
        maxItems: 5,
    },
    empty:{
        type:Boolean,
    }
});



const Workspace = mongoose.model("Workspace" , workspaceSchema);


export {Workspace} 