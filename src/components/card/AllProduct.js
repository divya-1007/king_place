import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import {
  Container,
  Paper,
  Typography,
  Stack,
} from "@mui/material";
import Carousel from 'react-material-ui-carousel';
import { styled } from "@mui/material/styles";


// components 
import AllProductViewPage from "./AllProductViewPage";
import './style.css'
// mock
var items = [
    '/images/banner3.jpg',
    '/images/banner1.jpg',
    '/images/banner2.jpg',
    '/images/banner5.jpg',
    '/images/banner2.jpg',
    '/images/banner7.jpg',
    '/images/banner4.jpg',
    // '/images/banner9.jpg',
    // '/images/room-wall.jpg',
    // '/images/slide_1.jpg'
  ]

// ----------------------------------------------------------------------
const StyledProductImg = styled("img")({
    top: 0,
    width: "50%",
    height: "50%",
    objectFit: "cover",
    position: "absolute",
  });
export default function AllProduct() {
  const [productType ,setProductType] =useState('All')
  return (
    <>
      <Helmet>
        <title> All Products | King Place </title>
      </Helmet>

      <Container>
      <Stack className="All_product"
          direction="column"
          // flexWrap="wrap-reverse"
          // alignItems="center"
          // justifyContent="flex-end"
        > 
      <Carousel stopAutoPlayOnHover duration={500} 
        indicatorContainerProps={{
          style: {
            // marginTop: '10px', 
            textAlign: 'right', 
            display: 'none'
          }

        }}
      >
        {items.map((image, index) => (
          <Paper key={index} style={{backgroundImage:`url(${image})`,backgroundRepeat: 'no-repeat',backgroundOrigin: 'content-box',width:'100%' ,height:470, backgroundSize:'cover',borderRadius:'none',
           position:'relative' ,zIndex:1,marginTop:'2rem' }}>
             <div style={{ justifyContent: 'center', alignItems: 'center', height: '100%', }}>
              <Typography
                style={{
                  textAlign: 'center',
                  backdropFilter: 'blur(1px) brightness(100%)',
                  color: '#ffff',
                  fontWeight: 'bold',
                  fontSize: '3rem',
                  padding: '6rem',
                }}
              >
                {(`King Place ${productType} Products`).toUpperCase()}
              </Typography>
              </div>
          </Paper>
        ))}
       
      </Carousel>
      </Stack>
        <AllProductViewPage  ProductType={setProductType} />
      </Container>
    </>
  );
}
