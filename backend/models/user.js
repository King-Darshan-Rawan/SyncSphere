import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
    },
    email :{
        type : String,
        required:true,
    },
    password :{
        type : String,
        required:true,
    },
    image:{
        url : String,
        filename : String,
    },
    linkedin:{
        type:String,
    },
    github:{
        type:String,
    }
});



const User = mongoose.model("User" , UserSchema);


export {User}