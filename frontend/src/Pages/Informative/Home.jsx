import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { Element } from 'react-scroll';
import NavbarInformative from '../../Components/NavbarInformative';

function Meet() {
  const [navbarColor, setNavbarColor] = useState('white');

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition > window.innerHeight) {
      setNavbarColor('black');
    } else {
      setNavbarColor('white');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar with dynamic text color */}
      <NavbarInformative textColor={navbarColor} />

      {/* First Slide with Background and Get Started Button */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://moccasin-gentle-cobra-185.mypinata.cloud/ipfs/QmcBpjawZn3gd3htaz6VPP2PL1kpF8qYttMkA9UcQ2UqBc)', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        <Typography variant="h3" sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' } }}>
          Welcome to Our Meet Application
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: 40,
            left: 40,
            backgroundColor: 'white',
            color: 'black',
            ':hover': {
              backgroundColor: 'lightgray',
            },
            fontSize: { xs: '0.75rem', sm: '1rem' },
          }}
        >
          <b>
            Get Started
          </b>
        </Button>
      </Box>

      {/* About Section */}
      <Element name="about">
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1">
              We are providing an amazing platform for video conferencing. Our services ensure smooth connectivity and collaboration.
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: '50vh', md: '100vh' },
              backgroundImage: 'url(https://moccasin-gentle-cobra-185.mypinata.cloud/ipfs/QmWuDWWvxvPiqM1JytsBdb2Pct4ZzorMn2SPGZUWi9KKFw)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mt: { xs: 4, md: 0 },
            }}
          />
        </Container>
      </Element>

      {/* Services Section */}
      <Element name="services">
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: '50vh', md: '100vh' },
              backgroundImage: 'url(https://moccasin-gentle-cobra-185.mypinata.cloud/ipfs/QmdvXKiopFMe9eMH3jPWtFduXg5JE1jEai6RvCuL4GH8nc)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mb: { xs: 4, md: 0 },
            }}
          />
          <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" gutterBottom>
              Our Services
            </Typography>
            <Typography variant="body1">
              We provide secure and reliable video calling, screen sharing, and conference features with best-in-class encryption and privacy.
            </Typography>
          </Box>
        </Container>
      </Element>

      {/* Contact Section */}
      <Element name="contact">
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row-reverse' },
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f5f5f5',
            borderRadius: '20px 0px 20px 0px',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: '50%' },
              height: { xs: '50vh', md: '100vh' },
              backgroundImage: 'url(https://moccasin-gentle-cobra-185.mypinata.cloud/ipfs/QmbZPrbDpBcj218TAyqb5aSPLz9AjbDeqbqtCwJ5fDUeSG)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: '0px 20px 0px 20px',
              mb: { xs: 4, md: 0 },
            }}
          />
          <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1">
              Have questions? Reach out to us at contact@ourmeet.com.
            </Typography>
          </Box>
        </Container>
      </Element>
    </>
  );
}

export default Meet;
