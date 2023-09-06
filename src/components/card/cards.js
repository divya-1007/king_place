import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Grid, Card,CardHeader,CardMedia,CardContent,CardActions,Collapse, Button,Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Link, RouterLink } from 'react-router-dom';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function Cards({item}) {
 
    return(
    <Box
      sx={{
        px: 1.5,
        py: 3,
      }}
    >
      <Box
        sx={{
          p: 0.5,
          backgroundColor: 'background.paper',
          borderRadius: 5,
          transition: (theme) => theme.transitions.create(['box-shadow']),
          '&:hover': {
            boxShadow: 1,
          },
        }}
      >
        <Box
          sx={{
            lineHeight: 0,
            overflow: 'hidden',
            borderRadius: 5,
            height: 390,
            mb: 2,
          }}
        >
          <Link to={`/all-product?type=${item?.label}`}>
         <img src={item?.image} width={550} height={427} alt={'Mentor '+item?.key}  />
          </Link>
        </Box>
        <Box sx={{ mb: 1}}>
          {/* <Typography component="h2" variant="h4" sx={{ fontSize: '1.4rem' }}>
            {item?.label}
          </Typography> */}
          {/* <Typography sx={{ mb: 2, color: 'text.secondary' }} variant="subtitle1">
            {item?.value}
          </Typography> */}
          <Box sx={{ '& img': { height: 26 } }}>
          </Box>
        </Box>
    
      </Box>
    </Box>
    );
}