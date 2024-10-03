import React from "react";
import { Box, List, ListItem, ListItemText, Divider, Typography, TextField, Button } from "@mui/material";

const ChatPage = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar - Chat List */}
      <Box
        sx={{
          width: "30%",
          backgroundColor: "#f0f0f0",
          p: 2,
          overflowY: "scroll",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Chats
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="John Doe" secondary="Hello!" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Jane Smith" secondary="How are you?" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText primary="Chat Group" secondary="Meeting at 5 PM" />
          </ListItem>
        </List>
      </Box>

      {/* Main Chat Window */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
          {/* Chat Messages */}
          <Typography align="left" sx={{ p: 1, backgroundColor: "#e0e0e0", borderRadius: "5px", mb: 1 }}>
            John Doe: Hello!
          </Typography>
          <Typography align="right" sx={{ p: 1, backgroundColor: "#d1ffd1", borderRadius: "5px", mb: 1 }}>
            You: Hi there!
          </Typography>
          <Typography align="left" sx={{ p: 1, backgroundColor: "#e0e0e0", borderRadius: "5px" }}>
            Jane Smith: How are you?
          </Typography>
        </Box>

        {/* Message Input */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            placeholder="Type a message"
            fullWidth
            sx={{ mr: 2 }}
          />
          <Button variant="contained" color="primary">
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
