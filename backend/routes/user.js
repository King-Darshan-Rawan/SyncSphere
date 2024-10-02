import { register } from "../controller/user.js";
import express from "express";
const router = express.Router();

router.route("/register")
.get(register)


export default router