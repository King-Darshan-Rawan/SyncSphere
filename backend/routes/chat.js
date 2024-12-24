import {accessChat , fetchChat , createGroupChat , renameGroup , removeFromGroup , addtoGroup} from "../controller/chat.js";
import express from "express";
const router = express.Router();

router.route("/accessChat")
.post(accessChat)

router.route("/fetchChat")
.get(fetchChat)

router.route("/createGroupChat")
.post(createGroupChat)

router.route("/renameGroup")
.put(renameGroup)

router.route("/removeFromGroup")
.put(removeFromGroup)

router.route("/addtoGroup")
.put(addtoGroup)

export default router;