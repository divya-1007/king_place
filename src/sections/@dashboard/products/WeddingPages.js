import PropTypes from 'prop-types';
import { useState} from "react";

// @mui
import { Box, Card,Typography, Grid,Stack ,Button} from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { Link, RouterLink } from 'react-router-dom';
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

WeddingPages.propTypes = {
  product: PropTypes.object,
};

export default function WeddingPages({ products,...other }) {

    return (
        <>
        <Grid container spacing={3} {...other}>
         {products.length>0 ?(<>
       
        {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
        <Card>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {product?.status && (
              <Label
                variant="filled"
                color={(product?.status === 'sale' && 'error') || 'info'}
                sx={{
                  zIndex: 9,
                  top: 16,
                  right: 16,
                  position: 'absolute',
                  textTransform: 'uppercase',
                }}
              >
                {product?.status}
              </Label>
            )}
            <StyledProductImg alt={product?.productName} src={product?.product_image} />
          </Box>
    
          <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                {product?.productName} 
              </Typography>
            <Link to={`/dashboard/view/${product?._id}`} underline="none" ><Button sx={{background:'#e1dff5d1' ,color:'black'}} textAlign="center">View</Button></Link>
            </Stack>
    
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                </Typography>
                &nbsp;
                {product?.productType && fCurrency(product?.price)}
              </Typography>
              <Link to={`/dashboard/edit/${product?._id}`} underline="none" ><Button sx={{background:'#e1dff5d1' ,color:'black'}} textAlign="center">Edit</Button></Link>
            </Stack>
          </Stack>
        </Card>
        </Grid>
          ))}
         </>)
         : 
         <Box sx={{ height: 40 ,m:5 }}>
           <CircularProgress
             size={40}
             sx={{
               color: "#001e3c",
               zIndex: 1,
               left: 1,
               marginLeft:'25rem',
               padding: 0.5,
               top: 2,
             }}
           />
         </Box>
         } 
        </Grid> 
        </>
      );
    }
