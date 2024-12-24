import React, { useState, useRef } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CloseIcon from "@mui/icons-material/Close";
import NoteIcon from "@mui/icons-material/Note";
import GroupIcon from "@mui/icons-material/Group";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import SpeechToText from "./SpeechToText";
import Webcam from "react-webcam"; // Webcam library

const MeetPage = () => {
  const [attendeesVisible, setAttendeesVisible] = useState(true);
  const [notesVisible, setNotesVisible] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [speechOutput, setSpeechOutput] = useState(""); // To store speech-to-text output
  const webcamRef = useRef(null);

  // Toggle microphone
  const toggleMic = () => setIsMicOn(!isMicOn);

  // Toggle video
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  // Toggle attendees sidebar
  const toggleAttendees = () => setAttendeesVisible(!attendeesVisible);

  // Toggle notes sidebar
  const toggleNotes = () => setNotesVisible(!notesVisible);

  // Speech-to-text using Web Speech API
  const startSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setSpeechOutput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Meeting
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ display: "flex", height: "80vh" }}>
        {/* Attendees Sidebar */}
        {attendeesVisible && (
          <Box sx={{ width: "20%", backgroundColor: "#f0f0f0", padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Attendees</Typography>
              <IconButton size="small" onClick={toggleAttendees}>
                <CloseIcon />
              </IconButton>
            </Box>
            <ul>
              <li>Alice</li>
              <li>Bob</li>
            </ul>
          </Box>
        )}

        {/* Center - Video Feed */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#e0e0e0",
            border: "2px solid purple",
            position: "relative",
          }}
        >
          {isVideoOn ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              style={{
                width: "80%",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
          ) : (
            <Typography variant="h4">Camera Off</Typography>
          )}
        </Box>

        {/* Notes Sidebar */}
        {notesVisible && (
          <Box sx={{ width: "30%", backgroundColor: "#f7f7f7", padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Notes</Typography>
              <IconButton size="small" onClick={toggleNotes}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                height: "70%",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: 1,
              }}
            >
              <Typography variant="body1">{speechOutput || "[Speech-to-text output here]"}</Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Bottom Control Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: 1,
          backgroundColor: "#f5f5f5",
        }}
      >
        <IconButton color={isMicOn ? "primary" : "secondary"} onClick={toggleMic}>
          {isMicOn ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        <IconButton color={isVideoOn ? "primary" : "secondary"} onClick={toggleVideo}>
          {isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <Button variant="contained" color="primary" onClick={startSpeechToText}>
          Start Speech-to-Text
        </Button>
        <IconButton color="primary" onClick={toggleNotes}>
          <NoteIcon />
        </IconButton>
        <IconButton color="primary" onClick={toggleAttendees}>
          <GroupIcon />
        </IconButton>
        <IconButton color="error">
          <CallEndIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default MeetPage;
