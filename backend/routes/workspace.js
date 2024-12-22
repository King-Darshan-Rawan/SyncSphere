import { Createworkspace , joinWorkSpace} from "../controller/workspace.js";
import express from "express";
const router = express.Router();

router.route("/create")
.post(Createworkspace)
.get(joinWorkSpace)


export default router