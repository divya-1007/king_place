import PropTypes from 'prop-types';
// @mui
import { Box, Card,Button, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import { Link, RouterLink } from 'react-router-dom';
// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  // const { name, cover, price, colors, status, priceSale } = product;
  // console.log(product ,"snsjc");
  const {productName, product_image,status,price,productType} = product
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}
        <StyledProductImg alt={productName} src={product_image} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1">
                {product?.productName} 
              </Typography>
            <Link to={`/dashboard/view/${product?._id}`} underline="none" ><Button sx={{background:'#e1dff5d1' ,color:'black'}} textAlign="center">View</Button></Link>
       </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {productType && fCurrency(price)} */}
            </Typography>
            &nbsp;
            {productType && fCurrency(price)}
          </Typography>
          <Link to={`/dashboard/edit/${product?._id}`} underline="none" ><Button sx={{background:'#e1dff5d1' ,color:'black'}} textAlign="center">Edit</Button></Link>
        </Stack>
      </Stack>
    </Card>
  );
}
