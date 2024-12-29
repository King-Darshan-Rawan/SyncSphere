
  import { createChat, fetchChat, createGroupChat, renameGroup, removeFromGroup, addToGroup} from "../controller/chat.js"

import express from "express";
const router = express.Router();

router.post('/chat/createChat', createChat);


router.route("/fetchChat")
.get(fetchChat)

router.route("/createGroupChat")
.post(createGroupChat)

router.route("/renameGroup")
.put(renameGroup)

router.route("/removeFromGroup")
.put(removeFromGroup)

router.route("/addtoGroup")
.put(addToGroup)

export default router;