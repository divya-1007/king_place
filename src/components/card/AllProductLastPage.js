import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, RouterLink } from 'react-router-dom';

// @mui
import { Box, Card, Grid, Typography, Stack,Button ,ButtonGroup} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../utils/formatNumber";
// components
import { GetRequest,Postrequest } from "../../apicall/index";
import { useNavigate, useParams } from "react-router-dom";
import AllProductView from "./AllProductView"
import {ProductCartWidget} from "../../sections/@dashboard/products";
import Cookies from 'js-cookie';
import './style.css'

// ----------------------------------------------------------------------

export default function AllProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(1);
  const [displayCounter, setDisplayCounter] = useState(true);
  const [commanProduct, setCommanProduct] = useState([]);
  const [counts, setCounts] = useState([]);
  const [cartItemStore, setCartItemStore] = useState([]);


  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if(count >1)setCount(count - 1);
  };

  function handelAddToCart(productID) {
    const existingProductIndex = counts.findIndex(item => item.product === productID);
  
    if (existingProductIndex !== -1) {
      const updatedCounts = [...counts];
      updatedCounts[existingProductIndex] = {
        ...updatedCounts[existingProductIndex],
        count: count,
      };
      setCounts(updatedCounts);
      const updatedCartItemStore = [
        { count: count, productId: product?._id, productName: product?.productName, cartItem: product },
        ...cartItemStore
      ];
      setCartItemStore(updatedCartItemStore);
      cartDataSave(updatedCartItemStore);
    } else {
      const newProduct = {
        status: true,
        count: count,
        product: product?._id,
        productName: product?.productName,
        cartItem: product
      };
  
      setCounts(prevCounts => [newProduct, ...prevCounts]);
      const updatedCartItemStore = [
        { count: count, productId: product?._id, productName: product?.productName, cartItem: product },
        ...cartItemStore
      ];
      setCartItemStore(updatedCartItemStore);
      cartDataSave(updatedCartItemStore);
    }
  }


  const cartDataSave = async (cartItem) => {
    console.log(cartItem ,"cartItemStore");
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Add 1 month
    Cookies.set('addToCart', JSON.stringify(cartItem), { expires: expirationDate,secure:true,sameSite:'Strict',path:'/' });
  };

  const getProduct = async () => {
    await GetRequest(`api/product/single-product/${id}`, )
      .then((response) => {
        if (response?.data) {
          setProduct(response?.data?.productData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCommanProduct = async () => {
    await GetRequest(`api/product/comman-product/${id}`, )
      .then((response) => {
        if (response?.data) {
          setCommanProduct(response?.data?.productData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
 
  useEffect(() => {
      getProduct();
    setTimeout(()=>{
      getCommanProduct();
    }, 1000)
  }, [id]);
  

  function handelPrivousPage(){
    navigate('/dashboard/'+product?.productType, { replace: true });
  }

  function handelBuyNow(productId){
    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
      navigate('/userDashboard/orderList/'+productId, { replace: true });
    }
    navigate('/login', { replace: true });
  }


  return (
    <Card>
      <Box
        sx={{
          backgroundColor: "background.paper",
          position: "relative",
          pt: 1,
          pb: { xs: 10, },
        }}
        >
        <Grid container columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ padding: "3px", mt: 1 }}>
              <img
                src={product?.product_image}
                alt={product?.productName}
                width={1100}
                height={600}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ m: 3 }}>

              <ProductCartWidget addToCart={counts} />

                <Typography
                  component="h2"
                  sx={{
                    position: "relative",
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: "bold",
                    lineHeight: 1.3,
                  }}
                >

                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      position: "relative",
                      color: "primary.main",
                      "& svg": {
                        position: "absolute",
                        top: -16,
                        right: -21,
                        width: { xs: 22, md: 30 },
                        height: "auto",
                      },
                    }}
                  >
                    {product?.productName}
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
                  {""}
                  <br />
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: "100%", md: "70%" } }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1" sx={{ml: 5, p: 1}}>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: "text.disabled",
                        textDecoration: "underline",
                        m:2
                      }}
                    >
                   <Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1', ml: 9, p: 1 ,color:'black',float: 'right'}} onClick={()=>handelPrivousPage(product?._id)} textAlign="right">Privous</Button>
                       {product?.status}
                    </Typography>
                    &nbsp;
                    {product?.productType && fCurrency(product?.price)}
                  </Typography>
                </Stack>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.6, ml: 7, p: 1 }}>
                  {
                   product?.productDescription
                  }
                </Typography>
                <Typography sx={{mt:2,ml:9}}>Quantity
                <ButtonGroup sx={{ ml: 9,background:'#e6e5f7'}} size="small" aria-label="small outlined button group">
                <Button sx={{color:'#000000'}} onClick={handleIncrement}>+</Button>
                {displayCounter && <Button sx={{color:'#000000'}}>{count}</Button>}
                {displayCounter && <Button sx={{color:'#000000'}} onClick={handleDecrement}>-</Button>}
              </ButtonGroup>
              </Typography>
              </Box>
              <Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',mb:5, ml: 9,mr:9,color:'black'}} onClick={()=>handelAddToCart(product?._id)}>Add to Cart</Button>
              {token ?
              <Link to={'/userDashboard/order_process/'+product?._id}><Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',width:'-webkit-fill-available', ml: 9,mr:9 ,color:'black',}} >Buy Now</Button></Link>
              :
              <Link to={'/login'}><Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',width:'-webkit-fill-available', ml: 9,mr:9 ,color:'black',}} onClick={handelBuyNow} >Buy Now</Button></Link>
               }
              </Box>
          </Grid>
        </Grid>
      </Box>
     
    
      {product?.productType ? 
      <> <Typography variant="subtitle1" sx={{ml: 5, p: 1,fontSize:'2rem'}}>Product Type {product?.productType}</Typography>
      <AllProductView products={commanProduct} />
      </>:null}
    </Card>
  );
}
