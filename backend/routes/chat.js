
  import { createGroupChat , createOneToOneChat ,removeUserFromGroup ,addUserToGroup , fetchChatById ,fetchOneToOneChat ,fetchGroupChats} from "../controller/chat.js"

import express from "express";
const router = express.Router();

router.route("/createOneToOneChat")
.post(createOneToOneChat)

router.route("/fetchOneToOneChat")
.get(fetchOneToOneChat)

router.route("/createGroupChat")
.post(createGroupChat)

router.route("/fetchGroupChats")
.get(fetchGroupChats)


router.route("/fetchChatById")
.get(fetchChatById)

router.route("/addUserToGroup")
.put(addUserToGroup)

router.route("/removeUserFromGroup")
.put(removeUserFromGroup)


export default router;