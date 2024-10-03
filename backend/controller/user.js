import { User } from "../models/user.js";


let register = async(req,res)=>{
    let {username , email , password} = req.body;
    try{
        let check = await User.findOne({username:username});
        if(check){
 
            res.status(400).json({msg:"This username already exist"});
        }else{
            const insert_data = await User.insertMany({username:username , email:email , password:password});
            res.status(200).json({msg:"User registered" , _id:insert_data[0]._id,username,email});
        }
    }catch(err){
        res.status(400).json(err);
    }
}

let login = async(req,res)=>{
    let {username , password}= req.body
    console.log(username,password)
  
    try{
      let check =await User.findOne({username:username});
      console.log(check);
      if(check){
        if ( check.password == password ){
          console.log("user has loged in")
          res.status(200).json({msg:"login successful"})

        }else{
          console.log("a user has inter a incorrect password");
          res.status(400).json("incorrect password");
        }
      }
      else{
        res.status(400).json("no user Exist with this username");
      }
    }catch(err){
      res.status(500).json(err)
    }
  } 


export {register,login}
