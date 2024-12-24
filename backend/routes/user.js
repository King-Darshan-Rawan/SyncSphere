import { register , login ,search} from "../controller/user.js";
import express from "express";
const router = express.Router();

router.route("/register")
.post(register)

router.route("/login")
.post(login)

router.route("/search")
.get(search)

export default router;