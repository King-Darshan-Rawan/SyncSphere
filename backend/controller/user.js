import { User } from "../models/user.js";


let register = async(req,res)=>{
    res.status(200).json({msg : "register reached"});
}

export {register}
