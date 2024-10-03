import { User } from "../models/user.js";


let register = async(req,res)=>{

    let {username , email , password} = req.body;

    console.log("1");

    try{
        console.log("2");
        let check = await User.findOne({username:username});
        console.log("3");

        if(check){
            console.log("4");
            res.status(400).json({msg:"This username already exist"})
        }else{
            console.log("5");
            const insert_data = await User.insertMany({username:username , email:email , password:password});
            res.status(200).json({msg:"User registered" , _id:insert_data[0]._id,username,email})
        }

    }catch(err){
        console.log("0");
        res.status(400).json(err);

    }
    
}

export {register}
