import {accessChat , fetchChat , createGroupChat , renameGroup , removeFromGroup , addtoGroup} from "../controller/chat.js";
import express from "express";
const router = express.Router();

router.route("/")
.post(accessChat)

router.route("/a")
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