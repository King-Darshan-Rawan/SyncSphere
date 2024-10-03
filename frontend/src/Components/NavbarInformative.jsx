import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function NavbarInformative({ textColor }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect for font size and background change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle Drawer open and close
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
      <List>
        <ListItem button>
          <Link to="about" spy={true} smooth={true} duration={500} offset={-50}>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="services" spy={true} smooth={true} duration={500} offset={-50}>
            <ListItemText primary="Services" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="contact" spy={true} smooth={true} duration={500} offset={-50}>
            <ListItemText primary="Contact" />
          </Link>
        </ListItem>
        <ListItem button>
          <RouterLink to="/SingIn" style={{ textDecoration: "none" }}>
            <ListItemText primary="Sign In/Up" />
          </RouterLink>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "transparent",
        boxShadow: scrolled ? "0 4px 10px rgba(0, 0, 0, 0.1)" : "none",
        transition: "background-color 1s ease, box-shadow 0.3s ease",
        py: scrolled ? 1 : 2,
        zIndex: 10,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: textColor,
            fontSize: scrolled ? "1.2rem" : "1.5rem", // Reduce font size when scrolled
            transition: "font-size 0.3s ease-in-out",
          }}
        >
          Sync Sphere
        </Typography>
        
        {/* Display Hamburger Menu for mobile screens */}
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: textColor }} />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box>
            {['about', 'services', 'contact'].map((section) => (
              <Button
                key={section}
                sx={{
                  color: textColor,
                  fontSize: scrolled ? "0.9rem" : "1rem", // Smaller font on scroll
                  transition: "all 0.3s ease",
                  '&:hover': {
                    textDecoration: "none",
                    '&::after': {
                      width: "90%",
                      transition: "width 0.7s ease-in-out",
                    },
                  },
                  position: "relative",
                  '&::after': {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: "0%",
                    backgroundColor: textColor,
                  },
                }}
              >
                <Link to={section} spy={true} smooth={true} duration={500} offset={-50}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              </Button>
            ))}
            <RouterLink to="/SignIn" style={{ textDecoration: "none" }}>
              <Button
                sx={{ 
                  color: scrolled ? "white" : "black", 
                  backgroundColor: scrolled ? "black" : "white",
                  fontSize: scrolled ? "0.9rem" : "1rem",
                  transition: "all 0.3s ease"
                }}
              >
                <b>

                Sign In/Up
                </b>
              </Button>
            </RouterLink>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavbarInformative;
