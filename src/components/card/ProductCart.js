import { useState, useEffect } from "react";
import { Badge } from '@mui/material';
// component
import Iconify from '../../components/iconify';

import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";

import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../utils/formatNumber";
// components
import { useNavigate, useParams } from "react-router-dom";
import { Link, RouterLink } from "react-router-dom";
import { GetRequest,DeleteRequest, Postrequest } from "../../apicall/index";
import { ProductCartWidget } from "../../sections/@dashboard/products";
import Cookies from 'js-cookie';

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

export default function ProductCart({ ...other }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [displayCounter, setDisplayCounter] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [cartItemStore, setCartItemStore] = useState([]);

  const handleIncrement = (id) => {
    setCartData(prevCartData => {
      return prevCartData.map(item => {
        if (item.cartItem._id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
  };

  const handleDecrement = (id) => {
    setCartData(prevCartData => {
      return prevCartData.map(item => {
        if (item.cartItem._id === id && item.count > 0) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    });
  };

  function handelAddToCart(id) {
    const selectedItem = cartData.find(item => item.cartItem._id === id);
    let updateData = {};
    if (selectedItem) {
        const updatedCartData = cartData.map(item => {
          if (item.cartItem._id === id) {
            updateData ={
              status: true,
              count: selectedItem.count, 
              product: item?.cartItem?._id,
              productName:item?.cartItem?.productName
            }
            return { ...item, count: selectedItem.count }; // Update count if needed
          }
          return item;
        });
        setCartItemStore(prev =>[updatedCartData ,...prev])
        setCartData(updatedCartData);
        cartDataSave()
    }
  }

  const setCookieWithOneMonthExpiration = (name, value) => {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Add 1 month
    Cookies.set(name, JSON.stringify(value), { expires: expirationDate,secure:true,sameSite:'Strict',path:'/' });
  };

  const cartDataSave = async () => {
    setCookieWithOneMonthExpiration('addToCart', cartItemStore);
  };

  const getProduct = async () => {
     const existingCartDatas = Cookies.get("addToCart");
     setCartData(JSON.parse(existingCartDatas))
  };

  const handelProductRemove = async(id)=> {
    let privousCount = cartData.filter((item) => item.cartItem._id != id);
    if (privousCount.length == 0) {
      navigate("/", { replace: true });
    }
    setCartData(privousCount);
  }
 

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Grid container spacing={1} {...other}>
     <ProductCartWidget addToCart={cartData.length>0 ? cartData : cartData}  /> 
      {cartData?.map((iteam, index) => (
        <Grid key={index} item xs={12}>
          <Card className="cart_product">
            <Box
              sx={{
                backgroundColor: "background.paper",
                position: "relative",
                pt: 1,
                pb: { xs: 10 },
              }}
            >
              <Grid container columns={12}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ padding: "3px", mt: 1 }}>
                    <img
                      src={iteam?.cartItem?.product_image}
                      alt={iteam?.cartItem?.productName}
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
                          {iteam?.cartItem?.productName}
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
                        <Typography variant="subtitle1" sx={{ ml: 5, p: 1 }}>
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "underline",
                              m: 2,
                            }}
                          >
                            {iteam?.product?.status}
                          </Typography>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              ml: 9,
                              p: 1,
                              color: "black",
                              float: "right",
                            }}
                            onClick={() =>
                              handelProductRemove(iteam?.productId )
                            }
                            textAlign="right"
                          >
                            Remove To Cart
                          </Button>
                          &nbsp;
                          {iteam?.cartItem?.productType &&
                            fCurrency(iteam?.cartItem?.price)}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                          ml: 7,
                          p: 1,
                        }}
                      >
                        {
                          "Grand Palace Hotel Services Banquet facilities,Bar, Computer facility,Conference and meeting facilities,Disabled room,Fitness room,Sauna,Luggage storage,More items...  They include common hotel room items such as TVs, sound systems, refrigerators, mini-bars, free Wi-Fi, coffee-makers, hairdryers and more. Amenities often include personal items like the toiletries the hotel provides. They can also include things that make a room more comfortable, such as air-conditioning"
                        }
                      </Typography>
                      <Typography sx={{ mt: 2, ml: 9 }}>
                        Quantity
                        <ButtonGroup
                          sx={{ ml: 9, background: "#e6e5f7" }}
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            sx={{ color: "#000000" }}
                            onClick={() => handleIncrement(iteam?.productId)}
                          >
                            +
                          </Button>
                          {displayCounter && (
                            <Button sx={{ color: "#000000" }}>
                              {iteam?.count}
                            </Button>
                          )}
                          {displayCounter && (
                            <Button
                              sx={{ color: "#000000" }}
                              onClick={() => handleDecrement(iteam?.productId)}
                            >
                              -
                            </Button>
                          )}
                        </ButtonGroup>
                      </Typography>
                    </Box>
                    <Button
                      sx={{
                        background: "#e1dff5d1",
                        border: "1px solid #2065d1",
                        mb: 5,
                        ml: 9,
                        mr: 9,
                        color: "black",
                      }}
                      onClick={() => handelAddToCart(iteam?.productId)}
                    >
                      Add to Cart
                    </Button>
                    {token ? (
                      <Link to={"/userDashboard/order_process/" + iteam?.productId}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            width: "-webkit-fill-available",
                            ml: 9,
                            mr: 9,
                            color: "black",
                          }}
                        >
                          proceed to Buy
                        </Button>
                      </Link>
                    ) : (
                      <Link to={"/login"}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            width: "-webkit-fill-available",
                            ml: 9,
                            mr: 9,
                            color: "black",
                          }}
                        >
                          proceed to Buy
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
