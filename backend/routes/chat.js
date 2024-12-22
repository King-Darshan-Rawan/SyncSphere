import {accessChat , fetchChat , createGroupChat , renameGroup , removeFromGroup , addtoGroup} from "../routes/user.js";
import express from "express";
const router = express.Router();

router.route("/")
.post(accessChat)

router.route("/")
.get(fetchChat)

router.route("/createGroupChat")
.post(createGroupChat)

router.route("/renameGroup")
.get(renameGroup)

router.route("/removeFromGroup")
.post(removeFromGroup)

router.route("/addtoGroup")
.get(addtoGroup)

export default router;