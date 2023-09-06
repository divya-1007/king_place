import * as React from 'react';
import {ImageList ,Grid} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Link, RouterLink } from 'react-router-dom';

import './style.css'
const itemDatas = [
    {
      img: '/images/gallery3.jpg',
      label: 'room',
      key:1
    },
    {
      img: '/images/gallery3.jpg',
      label: 'room',
      key:2,
    },
    {
      img: '/images/gallery3.jpg',
      label: 'room',
      key:3,
    },
    {
      img: '/images/gallery4.jpg',
      label: 'room',
      key:4,
    },
    {
      img: '/images/gallery5.jpg',
      label: 'room',
      key:5,
    },
    {
      img: '/images/gallery6.jpg',
      label: 'room',
      key:6,
    },
    {
      img: '/images/gallery7.jpg',
      label: 'room',
      key:7,
    },
    {
      img: '/images/gallery8.jpg',
      label: 'room',
      key:9,
    },
    {
      img: '/images/gallery5.jpg',
      label: 'room',
      key:10
    },
    {
      img: '/images/gallery1.jpg',
      label: 'room',
      key:11,
    },
    {
      img: '/images/gallery3.jpg',
      label: 'room',
      key:12,
    },
    {
      img: '/images/gallery4.jpg',
      label: 'room',
      key:13
    },
  ];
  
  // @media (min-width: 1200px)
// <style>
// .css-1oqqzyl-MuiContainer-root {
//     max-width: 100%;
// }
export default function Gallary({item}) {
//  console.log(item);
    return(
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {itemDatas.map((item) => (
          
          <Grid item  sm={4} md={4} key={item.key}>
            <Link to={`/all-product?type=${item?.label}`}>
          <ImageListItem key={item.key} sx={{ maxWidth: '100%',height: '450px !important'}}>
          
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="lazy"
              // width={550} height={427}
            />
            
            <ImageListItemBar
              // title={item.title}
              // subtitle={item.author}
              // actionIcon={
              //   <IconButton
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.kay}`}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
            />
          </ImageListItem>
          </Link>

          </Grid>
        ))}
       </Grid>
    );
}


