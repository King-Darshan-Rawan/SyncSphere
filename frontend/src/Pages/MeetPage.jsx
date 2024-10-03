import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MeetPage = () => {
  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meet Clone
          </Typography>
          <Button color="inherit">Join Meeting</Button>
          <Button color="inherit">Schedule</Button>
        </Toolbar>
      </AppBar>
      
      {/* Video Section */}
      <Box
        sx={{
          display: "flex",
          height: "80vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e0e0e0",
        }}
      >
        <Typography variant="h4">Meeting Room</Typography>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <IconButton color="primary">
          <VideocamIcon />
        </IconButton>
        <IconButton color="primary">
          <MicIcon />
        </IconButton>
        <IconButton color="primary">
          <MoreVertIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default MeetPage;
