import { Createworkspace } from "../controller/workspace.js";
import express from "express";
const router = express.Router();

router.route("/create")
.post(Createworkspace)


export default router