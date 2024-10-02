import React from "react";
import { Typography, Container } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to My Website
      </Typography>
      <Typography variant="body1">
        This is the homepage using Material UI components.
      </Typography>
    </Container>
  );
};

export default Home;
