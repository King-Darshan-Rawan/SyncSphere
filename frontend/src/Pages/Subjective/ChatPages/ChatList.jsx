import React from "react";
import { Box, List, ListItem, ListItemText, Divider, Typography } from "@mui/material";

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "30%" },  // Full width on mobile, 30% on larger screens
        backgroundColor: "#f0f0f0",
        p: 2,
        height: { xs: "auto", sm: "100vh" },  // Height auto on mobile, 100vh on larger screens
        overflowY: { sm: "scroll" },  // Enable scrolling only on larger screens
        display: { xs: "block", sm: "flex" },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Chats
      </Typography>
      <List>
        {chats.map((chat, index) => (
          <React.Fragment key={index}>
            <ListItem button onClick={() => onSelectChat(chat)}>
              <ListItemText primary={chat.name} secondary={chat.lastMessage} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
