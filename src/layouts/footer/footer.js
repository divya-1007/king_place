import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, RouterLink } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: '#001e3c',
        mt:5
      }}

    >
      <Container id='footer' maxWidth="lg">
        <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          
           <img src="/images/logo1.png" style={{backgroundColor:'white',color:'#fff',mb:1,opacity:'0.92',backgroundColor:'rgb(242 248 255)'}}/>
            <Typography color="#ffffff8c"variant="h6" align="center" sx={{m:1,fontSize:10,}}>Continually productize with compeling dome packed with all elated in utilize website and creating supply</Typography>
          {/* </a> */}
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" color="white" gutterBottom>
              <a href="#homes" style={{textDecoration:'none',color:'white'}}>Company</a>
            </Typography>
            <Typography variant="h6"  gutterBottom>
             <a href="#aboutUs" style={{textDecoration:'none',color:'white'}}>About Us</a>
            </Typography>
            <Typography variant="h6" color="white" gutterBottom>
            <a href="#hero" style={{textDecoration:'none',color:'white'}}> Room Booking</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
          <Typography variant="h6" color="white" gutterBottom>
              <a href="#wedding" style={{textDecoration:'none',color:'white'}}>Wedding Booking</a>
            </Typography>
          <Typography variant="h6" color="white" gutterBottom>
             <Link to={'/privacyPolicy' } underline="none" style={{textDecoration:'none',color:'white'}} > Privacy Policy </Link>
            </Typography>
            <Typography variant="h6" color="white" gutterBottom>
            <Link to={'/termsAndCondition'} underline="none" style={{textDecoration:'none',color:'white'}}>Terms & Conditions </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="white" gutterBottom>
            <Link to={'/contact'} underline="none" style={{textDecoration:'none',color:'white'}}>Contact Us</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
            <Typography variant="h6" color="white" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/"
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.twitter.com/" >
              <Twitter />
            </Link>
          </Grid>
        </Grid>
        <Box mt={1}>
          <Typography variant="body2" color="white" align="center">
            {"Copyright © "}
            <Link color="inherit" to="/">
              Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}