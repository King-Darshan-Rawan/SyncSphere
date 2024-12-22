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

let login = async(req,res)=>{
    let {userConfirm , password}= req.body;
    console.log(userConfirm,password);
  
    try{
      const user = await User.findOne({
        $or: [{ userId: userConfirm }, { email: userConfirm }],
      });
      if(user){
        const isPasswordValid = await bcrypt.compare(password,user.password); 
        console.log(isPasswordValid);
        if (isPasswordValid){
          console.log("1");
          const token = jwt.sign({ username : userConfirm}, SECRET_KEY, {
            expiresIn: "3h",
          });
          console.log("user has loged in")
          res.status(200).json({token})
        }else{
          console.log("a user has inter a incorrect password");
          res.status(400).json("incorrect password");
        }
      }
      else{
        res.status(400).json("no user Exist with this email");
      }
    }catch(err){
      res.status(500).json(err)
    }
  } 


export {register,login}
