import 'dotenv/config';

import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";

// const DB_URL = process.env.MONGO_ATLAS_WEB;
// console.log(DB_URL);

const DB_URL = "mongodb+srv://aniketdekate1:AniketDarshanWebProject@cluster0.bd4kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = 3000;




import userRouter from "./routes/user.js"
import workspaceRouter from "./routes/workspace.js"


async function main() {
  
  try{
    await mongoose.connect(DB_URL);
  }
  catch(err){
    console.error("not defined",err)
  }
  
};


main().then(()=>{
  console.log("connected to dataBase");
}).catch((err) =>{
  console.log(err);
});



app.get("/",(req,res)=>{
  res.send("reached");
})


app.use(bodyParser.json());
app.use("/users" , userRouter);
app.use("/workspace" , workspaceRouter);


app.listen(port, function () {
    console.log(` web server listening on port ${port}`)
    
  })

