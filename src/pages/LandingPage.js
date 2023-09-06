import React, {useState, useEffect, useRef } from 'react';
import ReactPlayer from "react-player";
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Box, Paper, ListItemAvatar, Button, Container, CardMedia, Typography } from '@mui/material';
import '../components/card/style.css'
import Carousel from 'react-material-ui-carousel'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, RouterLink } from 'react-router-dom';

// components
import HeaderMenu from 'src/layouts/landing/headers/HeaderMenu';
import CardIndexs from 'src/components/card/index';
import GallaryRoom from 'src/components/card/gallary';
import WeddingBlog from 'src/components/card/wedding';
import FoodService from 'src/components/card/foodservice';
import ContactUs from './ContactUs'
// ----------------------------------------------------------------------
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------
const exps = [
  {
    label: 'Students',
    value: '10K+',
  },
  {
    label: 'Quality Course',
    value: '20+',
  },
  {
    label: 'Experience Mentors',
    value: '10+',
  },
]
var items = [
  '/images/banner3.jpg',
  '/images/banner1.jpg',
  '/images/banner2.jpg',
  '/images/banner5.jpg',
  '/images/banner2.jpg',
  '/images/banner7.jpg',
  '/images/banner4.jpg',
  '/images/banner9.jpg',
  '/images/banner10.jpg',
  '/images/slide_1.jpg'
]

var about = [
  '/images/about.png',
  '/images/about1.jpg',
  '/images/about2.jpg',
  '/images/about3.jpg',
  '/images/about2.jpg',
  '/images/about1.jpg',
  '/images/about4.jpg',
  '/images/about3.jpg',
]

var about1 = [
  '/images/slider_2.jpg',
  '/images/banner5.jpg',
  '/images/banner8.jpg',
  '/images/wedding1.png',
  '/images/gallery_4.jpg',
  '/images/slider_1.jpg',
  '/images/banner10.jpg',
  '/images/gallary_6.jpg',
]

var foods = [
  '/images/foodSlider9.jpg',
  '/images/foodSlider1.jpg',
  '/images/foodSlider3.jpg',
  '/images/foodSlider10.jpg',
  '/images/foodSlider4.jpg',
  '/images/foodSlider5.jpg',
  '/images/foodSlider7.jpg',
  '/images/foodSlider8.jpg',
  '/images/foodSlider6.jpg',
  '/images/foodSlider.jpg',
]

export default function LandingPage() {
  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;
  
  if(mobileView == true){
  let styleData = document.querySelector('body');
  styleData.style.width = 'fit-content';
  }else{
    let styleData = document.querySelector('body');
    styleData.style.width = '100%';
  }

  

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    }
  }, []);
  return (
      <>
      <HeaderMenu />
     
      <Carousel stopAutoPlayOnHover duration={500} 
        indicatorContainerProps={{
          style: {
            marginTop: '50px', 
            textAlign: 'right', 
            display: 'none'
          }

        }}
      >
  
        {items.map((image, index) => (
          <Paper key={index} style={{backgroundImage:`url(${image})`,backgroundRepeat: 'no-repeat',backgroundOrigin: 'content-box',width:'100%' ,height:781, backgroundSize:'cover',borderRadius:'none',
          position:'relative' ,zIndex:1, marginTop: '61px'}}>
            {/* <div style={{textAlign:'none' ,display:'block',paddingTop:'100px'}}>
            <div style={{backgroundImage:'url(/images/food_1.png)',backgroundRepeat: 'no-repeat',backgroundOrigin: 'content-box',width:500,height:550 ,backgroundSize:'contain' ,display:'inline-block'}}/>
            <div style={{backgroundImage:'url(/images/food_2.png)', backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box', width:500, height:550, backgroundSize:'contain', 
            alignItems:'flex-end', float: 'right', display:'inline-block'}} />
            </div> */}
          </Paper>
        ))}
       
      </Carousel>
     
      <Grid id='homes' container columns={12} sx={{backgroundColor:'#001e3c'}}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ m: 3 }}>

              <Typography
                component="h2"
                sx={{
                  position: 'relative',
                  fontSize: { xs: 40, md: 72 },
                  letterSpacing: 1.5,
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                  color:'#fff',
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
                  Moment of Pure{' '}
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
                Prestige Rooms {' '}
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
                  Accmmoation
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
                </Typography>{' '}
                <br />
                with Different Way
              </Typography>
            </Box>
            <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1,color:'#fff', }}>
                {
                  "The highest level of living with luxury. Residences are distinctively designed and exquisitely appointed, creating ideal places where memories are made and experiences are genuine."
                }
              </Typography>
            </Box>
            <Box sx={{ '& button': { mr: 2 } }}>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: '10px', mt: 2 }}>
            <img src="/images/banner7.jpg" alt="Certificate icon" height={600} />
          </Box>
        </Grid>
      </Grid>

      {/* cards */}
      <Box id="hero" sx={{
        backgroundColor: '#001e3c', background: 'url(/images/banner2.jpg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', position: 'relative', pt: 4, pb: { xs: 10, md: 9 }
      }}>
        <Container maxWidth="lg">
          <CardIndexs />
        </Container>
      </Box>

      {/* room  details */}
      <Box sx={{ backgroundColor: '#001e3c', position: 'relative', pt: 1, pb: { xs: 10, md: 2 } }}>
        <Grid container columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '3px', mt: 1 }}>
              <img src="/images/carousel-2.jpg" alt="Certificate icon1" width={'100%'} height={600} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ m: 3 }}>

                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    lineHeight: 1.3,
                    color:'#fff',
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
                    King Palace {' '}
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
                  Hotel {' '}

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
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1,color:'#fff', }}>
                  {
                    "Grand Palace Hotel Services Banquet facilities,Bar, Computer facility,Conference and meeting facilities,Disabled room,Fitness room,Sauna,Luggage storage,More items...  They include common hotel room items such as TVs, sound systems, refrigerators, mini-bars, free Wi-Fi, coffee-makers, hairdryers and more. Amenities often include personal items like the toiletries the hotel provides. They can also include things that make a room more comfortable, such as air-conditioning"
                  }
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Gallary */}
      <Box sx={{ backgroundColor: '#001e3c', position: 'relative', pb: { xs: 1, md: 1 } }}>
        <Container>
          <GallaryRoom />
          <Link variant="subtitle2" to={'/all-product?type=room'}>
          <Button variant="contained" color="primary" sx={{ width: '100%', mt: 2, height: '20%' }}>
            See More
          </Button>
          </Link>
        </Container>
      </Box>

        {/* wedding video */}
        {mobileView == false ?
      <Box sx={{ padding: '10px', mt: 2, width:'100%',overflow:'hidden' }}>
        <ReactPlayer
          className="player"
          url='/images/wedding.mp4'
          playing={true}
          muted={true}
          loop={true}
          width={'100%'}
          height={'100%'}
        />
      </Box>
      : 
      <Box sx={{ padding: '10px', mt: 2, width:'100%' ,overflow:'hidden' }}>
      <ReactPlayer
        className="player"
        url='/images/wedding.mp4'
        playing={true}
        muted={true}
        loop={true}
        width={'100%'}
      />
    </Box>
     }

      {/* wedding */}
      <Box id='wedding' sx={{ backgroundColor: '#001e3c', position: 'relative', pt: 1, pb: { xs: 10, md: 2 } }}>
        <Grid container columns={12}>
          <Grid item xs={10} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ m: 3 }}>

                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    color:'#fff',
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
                    King Palace {' '}
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
                  Hotel {' '}

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
                    Wedding Booking
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
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1,color:'#fff', }}>
                  {"Planning a wedding without professional help is tedious & stressful. With WedAssist, an expert planner will work with you throughout your wedding planning journey and help you bring method to this madness"}
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '3px', mt: 3 }}>
              <img src="/images/wedding.jpg" alt="Certificate icon1" width={1100} height={600} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Wedding blog */}
      <Box sx={{ backgroundColor: '#001e3c', position: 'relative', pb: { xs: 1, md: 1 } }}>
        <Container>
          <WeddingBlog />
          <Link variant="subtitle2" to={'/all-product?type=wedding'}>
          <Button variant="contained" color="primary" sx={{ width: '100%', mt: 2, height: '20%' }}>
            See More
          </Button>
          </Link>
        </Container>
      </Box>

      {/* ABOUT */}
      <Box id='aboutUs' sx={{ backgroundColor: '#001e3c', position: 'relative', pt: 1, }}>
        <Grid container columns={12}>
          <Grid item xs={10} md={6}>
            <Box sx={{ padding: '3px', mt: 1 }}>
              <Carousel stopAutoPlayOnHover duration={3000}
                indicatorContainerProps={{
                  style: {
                    marginTop: '50px', // 5
                    textAlign: 'right', // 4
                    display: 'none'
                  }

                }}
              >
                {about.map((image, index) => (
                  <Paper key={index}>
                    <img src={image} width={2100} height={600} alt={`Image ${index}`} />
                  </Paper>
                ))}
              </Carousel>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ m: 3 }}>

                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    lineHeight: 1.3,
                    color:'#fff',
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
                    King Palace {' '}
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
                  Hotel {' '}

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
                    AboutUs
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
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1,color:'#fff', }}>
                  {
                    `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing
                  packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  
                  
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`
                  }
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Box>
      <Box sx={{ backgroundColor: '#001e3c', position: 'relative', pt: 1, pb: { xs: 10, md: 2 } }}>
        <Grid container columns={12}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: 'center', md: 'left' },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ m: 1 }}>

                <Typography
                  component="h2"
                  sx={{
                    position: 'relative',
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: 'bold',
                    lineHeight: 1.3,
                    color:'#fff',
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

                    Why Guest{' '}
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
                  </Typography> {' '}
                  Choose
                  <br />
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

                    King Palace  Hotel
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
              <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
                <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1 ,color:'#fff',}}>
                  {
                    `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing
                  packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                  
                  
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.`
                  }
                </Typography>
              </Box>
              <Box sx={{ '& button': { mr: 2 } }}>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: '3px', mt: 1 }}>
              <Carousel stopAutoPlayOnHover duration={5000}
                indicatorContainerProps={{
                  style: {
                    marginTop: '50px', // 5
                    textAlign: 'right', // 4
                    display: 'none'
                  }

                }}
              >
                {about1.map((image, index) => (
                  <Paper key={index}>
                    <img src={image} width={2100} height={600} alt={`Image ${index}`} />
                  </Paper>
                ))}
              </Carousel>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* food video */}
      {mobileView == false ?
      <Box id='foodContent' sx={{ padding: '10px', mt: 2, width:'100%',overflow:'hidden' }}>
        <ReactPlayer
          className="player"
          url='/images/Project_V4.mp4'
          playing={true}
          muted={true}
          loop={true}
          width={'100%'}
          height={'100%'}
          />
          {/* <div style={{textAlign:'none' ,display:'block',paddingTop:'100px',position:'relative' ,top:'-810px' ,zIndex:'999'}}>
            <div style={{backgroundImage:'url(/images/food_1.png)',backgroundRepeat: 'no-repeat',backgroundOrigin: 'content-box',width:'100%',height:550 ,backgroundSize:'contain' ,display:'inline-block'}}/>
            <div style={{backgroundImage:'url(/images/food_3.png)', backgroundRepeat: 'no-repeat', backgroundOrigin: 'content-box', width:500, height:550, backgroundSize:'contain', 
            alignItems:'flex-end', float: 'right', display:'inline-block'}} />
          </div> */}
        
      </Box>
      :
      <Box id='foodContent' sx={{ padding: '10px', mt: 2, width:'100%',overflow:'hidden' }}>
        <ReactPlayer
          className="player"
          url='/images/Project_V4.mp4'
          playing={true}
          muted={true}
          loop={true}
          width={'100%'}
          />
      </Box>
        }

      <Grid container columns={12} sx={{backgroundColor:'#001e3c'}}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ m: 3 }}>

              <Typography
                component="h2"
                sx={{
                  position: 'relative',
                  fontSize: { xs: 40, md: 72 },
                  letterSpacing: 1.5,
                  fontWeight: 'bold',
                  lineHeight: 1.3,
                  color:'#fff',
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
                  Come And Taste{' '}
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
                Our Delicacies {' '}
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
                  Food
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
                </Typography>{' '}
                <br />
                with Different Way
              </Typography>
            </Box>
            <Box sx={{ mb: 4, width: { xs: '100%', md: '70%' } }}>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.6, ml: 5, p: 1 ,color:'#fff',}}>
                {
                  `Explore texture, color and of course the ultimate tastes with our menu of the season. All the ingredients are fresh and carefully selected by our chefs.Lettuce, olive oil, egg, Worcestershire sauce,
                   anchovies, garlic, Dijon mustard, Parmesan cheese, and black pepper ,Honey Vanilla Ice Cream ,Summer Berry Coconut Tart,Terrific Turkey Chili,Creamy Chicken & Wild Rice Soup,Italian Sausage Soup Potato Cheddar Cheese,Salmon Salad etc`
                }
              </Typography>
            </Box>
            <Box sx={{ '& button': { mr: 2 } }}>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: '3px', mt: 1 }}>
            <Carousel stopAutoPlayOnHover duration={500}
              indicatorContainerProps={{
                style: {
                  marginTop: '50px', // 5
                  textAlign: 'right', // 4
                  display: 'none'
                }

              }}
            >
              {foods.map((image, index) => (
                <Paper key={index}>
                  <img src={image} width={2100} height={687} alt={`Image ${index}`} />
                </Paper>
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>

      {/* food blog */}
      <Box sx={{ backgroundColor: '#001e3c', position: 'relative', pb: { xs: 1, md: 1 } }}>
        <Container>
          <FoodService />
          <Link variant="subtitle2" to={'/all-product?type=food'}>
          <Button variant="contained" color="primary" sx={{ width: '100%', mt: 2, height: '20%' }}>
            See More
          </Button>
          </Link>
        </Container>
      </Box>
      {/* Contact US */}
      <Box id='contactUs' sx={{ backgroundColor: '#001e3c', position: 'relative', pt: 1, pb: { xs: 10, md: 2 } }}>
        <ContactUs/>
      </Box>
    
    </>
  );
}

