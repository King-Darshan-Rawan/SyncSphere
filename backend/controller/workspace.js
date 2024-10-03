import { Workspace } from "../models/workspace.js";
import { User } from "../models/user.js";

let Createworkspace = async (req, res) => {
  const { UserId, UserName, userPass } = req.body;

  try {
    const UserF = await User.findById(UserId);
    if (!UserF) {
      return res.status(404).json({ msg: "Owner not found" });
    }
    const newWorkspace = new Workspace({
      owner: UserId,
      UserName: UserName,
      userPass: userPass,
      members: [UserId],  
      empty: false,
    });
    console.log(newWorkspace)
    const savedWorkspace = await newWorkspace.save();

    res.status(200).json({
      msg: "Workspace created successfully",
      workspaceId: savedWorkspace._id,
      UserName: savedWorkspace.UserName,
      members: savedWorkspace.members,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};
let joinWorkSpace = async (req, res) => {
    const { userId, workspaceId, userPass } = req.body;
  
    try {
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ msg: "Workspace not found" });
      }
      if (workspace.userPass !== userPass) {
        return res.status(401).json({ msg: "Invalid workspace password" });
      }
      if (workspace.members.includes(userId)) {
        return res.status(400).json({ msg: "User is already a member of the workspace" });
      }
      if (workspace.members.length >= 10) {
        return res.status(400).json({ msg: "Workspace is full" });
      }
      workspace.members.push(userId);
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
