import * as React from 'react';
import {ImageList ,Grid} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Link, RouterLink } from 'react-router-dom';
import './style.css'
const itemDatas = [
    {
      img: '/images/food12.jpg',
      label: 'food',
      key:1
    },
    {
      img: '/images/food13.jpg',
      key:2,
      label: 'food',
    },
    {
      img: '/images/food14.jpg',
      key:3,
      label: 'food',
    },
    {
      img: '/images/food18.jpg',
      key:4,
      label: 'food',
    },
    {
      img: '/images/food11.jpg',
      key:5,
      label: 'food',
    },
    {
      img: '/images/food3.jpg',
      key:6,
      label: 'food',
    },
    {
      img: '/images/food17.jpg',
      key:7,
      label: 'food',
    },
    {
      img: '/images/food15.jpg',
      key:9,
      label: 'food',
    },
    {
      img: '/images/food16.jpg',
      key:10,
      label: 'food',
    },
    {
      img: '/images/food2.jpg',
      key:11,
      label: 'food',
    },
    {
      img: '/images/food1.jpg',
      key:12,
      label: 'food',
    },
    {
      img: '/images/food19.jpg',
      key:13,
      label: 'food'
    },
  ];
  

export default function FoodService({item}) {
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
              alt={item.key}
              loading="lazy"
            />
            <ImageListItemBar
              // actionIcon={
              //   <IconButton
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.key}`}
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


