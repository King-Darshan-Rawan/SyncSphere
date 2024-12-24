import { User } from "../models/user.js";
import bcrypt from "bcrypt";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

const SECRET_KEY = "adsasd";
let register = async(req,res)=>{
    let {firstName, lastName , email , userName, password } = req.body;
    const fullname = firstName + " " + lastName;

    try{
        let check = await User.findOne({userId:userName});
        if(check){
            res.status(400).json({msg:"This username already exist"});
        }else{
            const hashpass = await bcrypt.hash(password, 10);
            const insert_data = await User.insertMany({username:fullname , email:email , password:hashpass , userId:userName});
            res.status(200).json({msg:"User registered" , _id:insert_data[0]._id,userName,email});
        }
    }catch(err){
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
  const { userConfirm, password } = req.body;

  // Check if required fields are missing
  if (!userConfirm || !password) {
    return res.status(400).json({
      error: "MISSING_FIELDS",
      message: "Email/Username and password are required.",
    });
  }

  try {
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ userId: userConfirm }, { email: userConfirm }],
    });

    if (!user) {
      console.log("No user exists with this email or username");
      return res.status(400).json({
        error: "USER_NOT_FOUND",
        message: "No user exists with this email or username.",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("A user entered an incorrect password");
      return res.status(400).json({
        error: "INVALID_PASSWORD",
        message: "Incorrect password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ username: userConfirm }, SECRET_KEY, {
      expiresIn: "3h",
    });

    console.log("User has logged in successfully");
    return res.status(200).json({ token });
  } catch (err) {
    console.error("Server error during login:", err);
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Something went wrong. Please try again later.",
    });
  }
};

const users = async(req,res) =>{
  try {
    const { search } = req.query;
    const limit = 10;
    console.log(search);

    if (!search) {
      return res.status(400).json({ message: "Search string is required" });
    }
    console.log("2");
    const users = await User.find({ userId: { $regex: `^${search}`, $options: "i" } })
      .limit(limit)
      .select("userId");
    console.log(users);
    console.log("3");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
}



export {register,login,users}
