import { register , login } from "../controller/user.js";
import express from "express";
const router = express.Router();

router.route("/register")
.post(register)

router.route("/login")
.get(login)



export default router