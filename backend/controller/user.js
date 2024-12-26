import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const router = express.Router();
const SECRET_KEY = "adsasd";

// Register a new user
const register = async (req, res) => {
  let { firstName, lastName, email, userName, password } = req.body;
  const fullname = `${firstName} ${lastName}`;

  try {
    let check = await User.findOne({ userId: userName });
    if (check) {
      res.status(400).json({ msg: "This username already exists" });
    } else {
      const hashpass = await bcrypt.hash(password, 10);
      const insert_data = await User.insertMany({
        username: fullname,
        email: email,
        password: hashpass,
        userId: userName,
      });
      res.status(200).json({
        msg: "User registered",
        _id: insert_data[0]._id,
        userName,
        email,
      });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

// User login
const login = async (req, res) => {
  const { userConfirm, password } = req.body;

  if (!userConfirm || !password) {
    return res.status(400).json({
      error: "MISSING_FIELDS",
      message: "Email/Username and password are required.",
    });
  }

  try {
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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("A user entered an incorrect password");
      return res.status(400).json({
        error: "INVALID_PASSWORD",
        message: "Incorrect password.",
      });
    }

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

// Search users
const search = async (req, res) => {
  try {
    const { search } = req.query;
    const limit = 10;

    if (!search) {
      return res.status(400).json({ message: "Search string is required" });
    }

    const users = await User.find(
      { userId: { $regex: `^${search}`, $options: "i" } },
      "userId"
    ).limit(limit);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "userId name profilePic");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ msg: "Server error while fetching users" });
  }
});

export { register, login, search, router };
