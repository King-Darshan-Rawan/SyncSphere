import React, { useState } from "react";
// Add this if you want styles specific to TaskTeam
import { GoMoveToEnd, GoMoveToStart } from "react-icons/go";

const TaskTeam = () => {
  const [sidebar, setSidebar] = useState(true);
  const [isActive, setIsActive] = useState(true); // State for dynamic class

  const toggleSidebar = () => {
    setSidebar(!sidebar);
    setIsActive(!isActive); // Toggle the active class state
  };

  return (
    <div className="chatmain-container">
      <div className="hider-container">
        <button
          onClick={toggleSidebar}
          className={`hider ${sidebar ? "sidebar-open" : "sidebar-closed"}`}
        >
          {sidebar ? <GoMoveToEnd /> : <GoMoveToStart />}
        </button>
      </div>

      <div className={`task-team ${isActive ? "active-sidebar" : "inactive-sidebar"}`}>
        <div className="team">
          <div className="task-top">
            <button className="join-button">Join Meet</button>
            <button className="create-button">Create Meet</button>
          </div>
          <div className="head">
            <p className="titel-sub-cont">Team</p>
          </div>
        </div>
        <div className="task">
          <div className="head">
            <p className="titel-sub-cont">Task</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTeam;
