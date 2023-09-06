import React, { FC } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme, styled } from '@mui/material/styles'
import Cards from './cards'
import { Container,Grid,Paper, Card,CardHeader,CardMedia,CardContent,CardActions,Collapse, Button,Box, Typography } from '@mui/material';

const data = [
    {
      key:1,
      label: 'room',
      value: 1254,
      image:'/images/room_1.jpg',
    },
    {
      key:2,
      label: 'room',
      value: 548,
      image:'/images/room_2.jpg',
    },
    {
        key:3,
        label: 'room',
      value: 4857,
      image:'/images/room_3.jpg',
    },
    {
        key:4,
        label: 'room',
      value: 4848,
      image:'/images/room_4.jpg',
    },
    {
        key:5,
        label: 'room',
      value: 551,
      image:'/images/room_5.jpg',
    },
    {
        key:6,
        label: 'room',
      value: 4755,
      image:'/images/room_6.jpg',
    },
  ]

const StyledDots = styled('ul')(({ theme }) => ({
  '&.slick-dots': {
    position: 'absolute',
    left: 0,
    bottom: -20,
    paddingLeft: theme.spacing(1),
    textAlign: 'left',
    '& li': {
      marginRight: theme.spacing(2),
      '&.slick-active>div': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}))
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function CardIndexs() {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('md'))
//   sx={{
    // fontSize: 'inherit',
    // fontWeight: 'inherit',
    // position: 'relative',
    // color:'primary.main',
    // '& svg': {
    //   position: 'absolute',
    //   top: -16,
    //   right: -21,
    //   width: { xs: 22, md: 30 },
    //   height: 'auto',
//     },
  return (
    <>
    <Box sx={{  background: 'rgb(250 247 247 / 33%)' ,   borderRadius: '49px'}}>
    <Typography display="flex" justifyContent="center" alignItems="center" 
    sx={{margin:1,padding:1 , fontSize: 'xx-large',fontWeight: 'bolder',
    position: 'relative',
    color:'primary.main',
    '& svg': {
      right: -22,
      mb:5,
      width: { xs: 29, md: 30 },
      height: 'auto',}}}>{"Accmmoation Room"}
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
    </Typography>
    <Grid container  columns={{ xs: 4, sm: 8, md: 12 }}>
    {data.map((item) => (
        <Grid item sm={4} md={4} key={item.key}>
          <Cards key={String(item.key)} item={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
  </>
  )
}


