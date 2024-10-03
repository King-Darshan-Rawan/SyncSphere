import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

function NavbarInformative({ textColor }) {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: textColor }}>
          Sync Sphere
        </Typography>
        <Box>
          <Button sx={{ color: textColor }}>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
            >
              About
            </Link>
          </Button>
          <Button sx={{ color: textColor }}>
            <Link
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
            >
              Services
            </Link>
          </Button>
          <Button sx={{ color: textColor }}>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
            >
              Contact
            </Link>
          </Button>
          
            <RouterLink
              to="/SingIn"
            >
                <Button sx={{ color: "black", backgroundColor: "white" }}>
              Sign In/Up
              </Button>
            </RouterLink>
         
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarInformative;
