import 'dotenv/config';

import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";

// const DB_URL = process.env.MONGO_ATLAS_WEB;
// console.log(DB_URL);

const DB_URL = "mongodb+srv://aniketdekate1:AniketDarshanWebProject@cluster0.bd4kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const port = 3000;


app.use(bodyParser.json());

import userRouter from "./routes/user.js"
import workspaceRouter from "./routes/workspace.js"

main().then(()=>{
  console.log("connected to dataBase");
}).catch((err) =>{
  console.log(err);
});


async function main() {
  await mongoose.connect(DB_URL);
};


app.get("/",(req,res)=>{
  res.send("reached");
})



app.use("/users" , userRouter);
app.use("/workspace" , workspaceRouter);


app.listen(port, function () {
    console.log(` web server listening on port ${port}`)
    
  })

