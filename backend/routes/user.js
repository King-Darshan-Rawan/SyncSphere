import { register , login ,users} from "../controller/user.js";
import express from "express";
const router = express.Router();

router.route("/register")
.post(register)

router.route("/login")
.post(login)

router.route("/users")
.get(users)

export default router;