import React, { useState } from "react";

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [username, setUsername] = useState("User"); // Static username for now

  const startListening = () => {
    const recognition = new window.SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US"; // Change this based on language preference

    recognition.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started...");
    };

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => `${prev} ${event.results[i][0].transcript}`);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      console.log("Voice recognition stopped.");
    };

    recognition.start();
  };

  const stopListening = () => {
    window.SpeechRecognition.stop();
    setIsListening(false);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Speech-to-Text</h1>
      <p>
        <strong>Username:</strong> {username}
      </p>
      <div style={{ margin: "10px 0" }}>
        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            padding: "10px 20px",
            backgroundColor: isListening ? "red" : "green",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
        <h2>Transcript</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
