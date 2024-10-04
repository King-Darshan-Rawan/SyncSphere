import { User } from "../models/user.js";


let register = async(req,res)=>{
    // console.log("on")
    let {username , email , password} = req.body;
    try{
        let check = await User.findOne({username:username});
        if(check){
            res.status(400).json({msg:"This username already exist"});
        }else{
            // console.log("first")
            const insert_data = await User.insertMany({username:username , email:email , password:password});
            res.status(200).json({msg:"User registered" , _id:insert_data[0]._id,username,email});
        }
    }catch(err){
        res.status(400).json(err);
    }
}




export {register}
