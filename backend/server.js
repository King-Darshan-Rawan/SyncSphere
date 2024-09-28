import 'dotenv/config'
import mongoose from 'mongoose';
import express from "express";


const DB_URL = process.env.MONGO_ATLAS;


const app = express();
const port = 3000;


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

app.listen(port, function () {
    console.log(` web server listening on port ${port}`)
    
  })

