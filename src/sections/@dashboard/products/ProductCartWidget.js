// @mui
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import { Link, RouterLink } from 'react-router-dom';
import { filter } from 'lodash';
import Cookies from 'js-cookie';
// @mui
import {Button} from "@mui/material";
import { useEffect } from 'react';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget({addToCart}) {
  function checkCount(addTo) {
    let sum = 0;
    addTo.map((element) => {
      sum += element.count;
    });
    return sum;
  }

  const setCookieWithOneMonthExpiration = (name, value) => {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Add 1 month
    Cookies.set(name, JSON.stringify(value), { expires: expirationDate,secure:true,sameSite:'Strict',path:'/' });
  };

  // useEffect(()=>{
  //   console.log(addCartData ,"addCartData");
  //   if(addCartData != null){
  //     setCookieWithOneMonthExpiration('addToCart', addCartData);
  //   }
 
  // } ,[addCartData])
  

  return (
    <StyledRoot>
      <Link to={'/all-product/cart'}>
      <Badge showZero badgeContent={addToCart !=undefined ? checkCount(addToCart):0} color="error" max={99}>
        <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
      </Badge>
      </Link>
    </StyledRoot>
  );
}
