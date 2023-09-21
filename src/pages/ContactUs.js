import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
// @mui
import './style.css';
import { Grid, Box,ListItemAvatar, Button, Container, List, ListItem, TextField, Typography } from '@mui/material';
// Icon
import Iconify from '../components/iconify';
import DraftsIcon from '@mui/icons-material/Drafts';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import SendIcon from '@mui/icons-material/Send';
import Footer from 'src/layouts/footer/footer';
import { toast } from "react-toastify";
import Fade from "@mui/material/Fade";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { Postrequest } from "../apicall/index";

const exps = [
  {
    label: 'Hotal',
    value: '10K+',
  },
  {
    label: 'Hotel Service',
    value: '20+',
  },
  {
    label: 'Visit Mentors',
    value: '10+',
  },
]

export default function ContactUs() {
  const [full_Name, setFull_Name] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);

    let empty = "";
    if (!email) {
      empty = "Email";
    } else if (!full_Name) {
      empty = "Full Name";
    }else if(!message){
      empty = "Message";
    }
    if (empty) {
      toast(`Please provide a ${empty}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message-error",
        theme: "light",
      });
      return;
    }


    const user = {
      email,
      full_Name,
      message
    };
    console.log(user);
    await Postrequest("api/users/contact-us", user)
      .then((response) => {
        if (response.status) {
          console.log(response.data.message);
         
          toast.success(`${response?.data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-sucess",
            theme: "light",
          });
          setTimeout(() => {
            setLoading(false)
            window.location.reload()
            setEmail("");
            setFull_Name("");
            setMessage(""); 
          }, 1000);
          
        }
      })
      .catch((error) => {
        console.log(error?.response?.data, "aya");
        if (error?.response?.data?.status === 412) {
          toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-error",
            theme: "light",
          });
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else {
          toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-error",
            theme: "light",
          });
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      });
  };
  return (
    <>
      <Container maxWidth="lg">
        {/* <Box style={{
          backgroundImage: `url(images/banner8.jpg)`, backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box', width: '100%', height: 400, backgroundSize: 'cover', borderRadius: 'none',
        }}>
          <Typography
            color="#fff" variant="h2" align="center" sx={{ fontSize: { xs: 40, md: 102 }, paddingTop: '105px', }}
          >
            CONTACT US {' '}
          </Typography>
        </Box> */}
      </Container >
      <Box>
      <Grid container columns={12} sx={{mb:2}} >
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: 'center' },
              height: '100%',
              m: 3,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ ml: 3 }}>

              <Typography
                component="h2"
                sx={{
                  position: 'relative',
                  fontSize: { xs: 30, md: 72 },
                  letterSpacing: 1.5,
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                }}
              >
                <Typography
                  component="mark"
                  sx={{
                    position: 'relative',
                    color: 'primary.main',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    backgroundColor: 'unset',
                  }}
                >
                  CONTACT US {' '}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: { xs: 24, md: 34 },
                      left: 2,
                      transform: 'rotate(3deg)',
                      '& img': { width: { xs: 146, md: 210 }, height: 'auto' },
                    }}
                  >
                    <img src="images/headline-curve.svg" alt="Headline curve" />
                  </Box>
                </Typography>
                {' '}
                <Typography
                  component="span"
                  sx={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    position: 'relative',
                    color: 'primary.main',
                    '& svg': {
                      position: 'absolute',
                      top: -16,
                      right: -21,
                      width: { xs: 22, md: 30 },
                      height: 'auto',
                    },
                  }}
                >
                  Facilities
                  <svg version="1.1" viewBox="0 0 3183 3072">
                    <g id="Layer_x0020_1">
                      <path
                        fill="#127C71"
                        d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                      />
                      <path
                        fill="#127C71"
                        d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                      />
                      <path
                        fill="#127C71"
                        d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                      />
                    </g>
                  </svg>
                </Typography>{''}
                <br />

              </Typography>
            </Box>
            <Box sx={{ mb: 10, width: { xs: '100%', } }}>
              <Typography sx={{ lineHeight: 1.6, fontSize: { xs: 30, md: 25 },color:'#fff', fontWeight: 'bold', ml: 5, }}>
                {"If You Wish To Learn More Ask Before Booking."}
              </Typography>
            </Box>
            <Box sx={{ mb: 4, }} >
              <Grid container columns={12}>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 4, width: { xs: '100%', },}}>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', m: 2 ,borderRadius: '4%'}}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <DraftsIcon />
                        </ListItemAvatar>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          support@yopmail.com
                        </Typography>
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <PhoneIcon />
                        </ListItemAvatar>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          1782-5445154
                        </Typography>
                      </ListItem>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <LocationOnIcon />
                        </ListItemAvatar>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          121 King Str, Melbourne Victoria
                        </Typography>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid tem xs={12} md={6}>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 1, width: '100%' },
                      backgroundColor:'#fff',
                      borderRadius:'4%',
                      p:'2%',
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField sx={{ alignItems:"center"}}
                        id="outlined-multiline-flexible"
                        name='full_Name'
                        onChange={(e) => setFull_Name(e.target.value)}
                        maxRows={4}
                        defaultValue="Full Name"
                        multiline
                      />
                      <br />
                      <TextField sx={{ alignItems:"center"}}
                        id="outlined-textarea"
                        type='email'
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Placeholder"
                        defaultValue="Email"
                        multiline
                      />
                      <br />
                      <TextField sx={{ alignItems:"center"}}
                        name='message'
                        onChange={(e) => setMessage(e.target.value)}
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        defaultValue="Comment.."
                      />
                      <br />
                    </div>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        onClick={handleClick}
                      >
                        {loading ? (
                          <Box sx={{ height: 40 }}>
                            <Typography sx={{ padding: 1 }}>Please Wait........</Typography>
                            <Fade
                              in={loading}
                              style={{
                                transitionDelay: loading ? "500ms" : "0ms",
                              }}
                              unmountOnExit
                            >
                              <CircularProgress
                                size={40}
                                sx={{
                                  color: "#ffffff",
                                  position: "absolute",
                                  zIndex: 1,
                                  left: 1,
                                  marginLeft: 5,
                                  padding: 0.5,
                                  top: 2,
                                }}
                              />
                            </Fade>
                          </Box>
                        ) : (
                          "Login"
                        )}
                      </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ boxShadow: 2, py: 4, px: 7, borderRadius: 4, }}>
          <Box sx={{ padding: '3px', mt: 3 }}>
            <img src="/images/contactus.jpg" alt="Certificate icon1" width={1100} height={400} />
          </Box>
            <Grid container spacing={2} columns={12}>
              {exps?.map((item) => (
                <Grid key={item?.value} item  md={4}>
                  <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 0 }, }}>
                    <Typography component="h4"
                      sx={{ color: 'secondary.main', mb: { xs: 1, md: 2 }, fontSize: { xs: 34, md: 44 }, fontWeight: 'bold' }}
                    >
                      {item?.value}
                    </Typography>
                    <Typography color="text.secondary" variant="h5">
                      {item?.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <div sx={{mt:2}}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.957312182191!2d75.86503257621536!3d22.692632979406486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce4fc1c4539%3A0xe28a047c826edbd8!2sBhawarkuan%20Square%2C%20Indrapuri%20Colony%2C%20Bhanwar%20Kuwa%2C%20Indore%2C%20Madhya%20Pradesh%20452001!5e0!3m2!1sen!2sin!4v1688463717874!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      </Box>
      <Footer/>
    </>
  )
}