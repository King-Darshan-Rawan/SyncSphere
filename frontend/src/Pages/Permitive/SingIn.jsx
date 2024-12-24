import React, { useState } from "react";
import axios from "axios";
// import { decode as jwtDecode } from "jwt-decode";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function SignIn() {
  const [userConfirm, setUserConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Make API call to login
      const response = await axios.post("http://localhost:3000/users/login", {
        userConfirm,
        password,
      });
  
      // Extract token from response
      const { token } = response.data;
  
      if (!token) {
        throw new Error("No token received. Please try again.");
      }
  
      // Store token in localStorage
      localStorage.setItem("token", token);
  
      // Decode token to get user info (if needed)
      // Uncomment the next lines if you need user info from the token
      // const decoded = jwtDecode(token);
      // console.log("User decoded from token:", decoded);
  
      // Navigate to chat page after successful login
      navigate("/chat");
    } catch (err) {
      if (err.response) {
        // Backend error
        const { error, message } = err.response.data;
        console.error(`Login failed: ${error} - ${message}`);
        setError(message || "An error occurred during login.");
      } else {
        // Network or other error
        console.error("Network or server error", err);
        setError("Unable to connect to the server. Please try again later.");
      }
    }
  };
  

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>} {/* Error message */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or Username"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setUserConfirm(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <RouterLink to="/" variant="body2">
                Forgot password?
              </RouterLink>
            </Grid>
            <Grid item>
              <RouterLink to="/SingUp" variant="body2">
                <Typography variant="body2" color="primary">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
