import {sendMessage , deleteMessage , editMessage , fetchMessage} from "../controller/message.js";
import express from "express";
const router = express.Router();

router.route("/sendMessage")
.post(sendMessage);

router.route("/fetchMessage/:chatId")
.get(fetchMessage);

router.route("/editMessage")
.put(editMessage);

router.route("/deleteMessage")
.delete(deleteMessage);

export default router;