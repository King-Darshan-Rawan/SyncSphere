import 'dotenv/config';
import mongoose from 'mongoose';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
// Database URL (move to .env file for security)
const DB_URL = process.env.MONGO_ATLAS_WEB || "mongodb+srv://aniketdekate1:AniketDarshanWebProject@cluster0.bd4kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Initialize app and server
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routers
import userRouter from "./routes/user.js";
import workspaceRouter from "./routes/workspace.js";
import chatRouter from "./routes/chat.js";
import messageRouter  from './routes/message.js';

app.use("/users", userRouter);
app.use("/workspace", workspaceRouter);
app.use("/chat" , chatRouter);
app.use("/message" , messageRouter);
// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Database connection failed", err);
  }
}
main();

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});
