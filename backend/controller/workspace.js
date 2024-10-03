import { Workspace } from "../models/workspace.js";
import { User } from "../models/user.js";

let Createworkspace = async (req, res) => {
  const { owner , wsname, wspassword } = req.body;

  try {
    const UserF = await User.findById(owner );
    if (!UserF) {
      return res.status(404).json({ msg: "Owner not found" });
    }
    const newWorkspace = new Workspace({
      owner: owner ,
      wsname: wsname,
      wspassword: wspassword,
      members: [owner ],  
      empty: false,
    });
    console.log(newWorkspace)
    const savedWorkspace = await newWorkspace.save();

    res.status(200).json({
      msg: "Workspace created successfully",
      workspaceId: savedWorkspace._id,
      wsname: savedWorkspace.wsname,
      members: savedWorkspace.members,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};
let joinWorkSpace = async (req, res) => {
    const { owner , workspaceId, wspassword } = req.body;
  
    try {
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ msg: "Workspace not found" });
      }
      if (workspace.wspassword !== wspassword) {
        return res.status(401).json({ msg: "Invalid workspace password" });
      }
      if (workspace.members.includes(owner )) {
        return res.status(400).json({ msg: "User is already a member of the workspace" });
      }
      if (workspace.members.length >= 10) {
        return res.status(400).json({ msg: "Workspace is full" });
      }
      workspace.members.push(owner );
      await workspace.save();
  
      res.status(200).json({
        msg: "Joined workspace successfully",
        workspaceId: workspace._id,
        members: workspace.members,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error", error: err });
    }
  };
  

export {Createworkspace}
