import * as React from 'react';
import {Grid} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
// import ListSubheader from '@mui/material/ListSubheader';
// import IconButton from '@mui/material/IconButton';
// import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

import './style.css'
const itemDatas = [
    {
      img: '/images/wedding4.jpeg',
      title: 'Breakfast',
      label: 'wedding',
      author: '@bkristastucchio',
      key:1
    },
    {
      img: '/images/wedding8.jpg',
      title: 'Burger',
      label: 'wedding',
      author: '@rollelflex_graphy726',
      key:2,
    },
    {
      img: '/images/wedding3.jpg',
      title: 'Camera',
      label: 'wedding',
      author: '@helloimnik',
      key:3,
    },
    {
      img: '/images/wedding4.jpg',
      title: 'Coffee',
      label: 'wedding',
      author: '@nolanissac',
      key:4,
    },
    {
      img: '/images/wedding5.jpeg',
      title: 'Hats',
      label: 'wedding',
      author: '@hjrc33',
      key:5,
    },
    {
      img: '/images/wedding5.jpg',
      title: 'Honey',
      label: 'wedding',
      author: '@arwinneil',
      key:6,
    },
    {
      img: '/images/wedding12.jpg',
      title: 'Basketball',
      label: 'wedding',
      author: '@tjdragotta',
      key:7,
    },
    {
      img: '/images/wedding10.jpg',
      title: 'Fern',
      label: 'wedding',
      author: '@katie_wasserman',
      key:9,
    },
    {
      img: '/images/wedding11.jpg',
      title: 'Mushrooms',
      label: 'wedding',
      author: '@silverdalex',
      key:10
    },
    {
      img: '/images/wedding2.jpeg',
      title: 'Tomato basil',
      label: 'wedding',
      author: '@shelleypauls',
      key:11,
    },
    {
      img: '/images/wedding7.jpg',
      title: 'Sea star',
      label: 'wedding',
      author: '@peterlaster',
      key:12,
    },
    {
      img: '/images/wedding1.jpeg',
      title: 'Bike',
      label: 'wedding',
      author: '@southside_customs',
      key:13
    },
  ];
  

export default function WeddingBlog({item}) {
    return(
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        {itemDatas.map((item) => (
          
          <Grid item sm={4} md={4} key={item.key}>
           <Link to={`/all-product?type=${item?.label}`}>
          <ImageListItem key={item.key} sx={{ maxWidth: '100%',height: '450px !important'}}>
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="lazy"
          
            />
            <ImageListItemBar
              // title={item.title}
              // subtitle={item.author}
              // actionIcon={
              //   <IconButton
              //     sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              //     aria-label={`info about ${item.title}`}
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


