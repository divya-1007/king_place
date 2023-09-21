import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";

import { fCurrency } from "../../utils/formatNumber";
// components
import { useNavigate,  } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProductCartWidget } from "../../sections/@dashboard/products";
import Cookies from "js-cookie";

// ----------------------------------------------------------------------

export default function ProductCart({ ...other }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [displayCounter, setDisplayCounter] = useState(true);
  const [cartData, setCartData] = useState([]);
  const [cartItemStore, setCartItemStore] = useState([]);

  const handleIncrement = (id) => {
    setCartData((prevCartData) => {
      return prevCartData.map((item) => {
        if (item.cartItem._id === id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
    console.log();
    cartDataSave();
  };

  const handleDecrement = (id) => {
    setCartData((prevCartData) => {
      return prevCartData.map((item) => {
        if (item.cartItem._id === id && item.count > 0) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    });
    cartDataSave();
  };

  // function handelAddToCart(id) {
    // const selectedItem = cartData.find((item) => item.cartItem._id === id);
    // let updateData = {};
    // if (selectedItem) {
    //   const updatedCartData = cartData.map((item) => {
    //     if (item.cartItem._id === id) {
    //       updateData = {
    //         status: true,
    //         count: selectedItem.count,
    //         product: item?.cartItem?._id,
    //         productName: item?.cartItem?.productName,
    //       };
    //       return { ...item, count: selectedItem.count }; 
    //     }
    //     return item;
    //   });
    //   setCartItemStore((prev) => [updatedCartData, ...prev]);
    //   setCartData(updatedCartData);
    // }
  // }

  const setCookieWithOneMonthExpiration = (name, value) => {
    const expirationDate = new Date();
    expirationDate.setMonth(expirationDate.getMonth() + 1); // Add 1 month
    Cookies.set(name, JSON.stringify(value), {
      expires: expirationDate,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });
  };

  const cartDataSave = async () => {
    setCookieWithOneMonthExpiration("addToCart", cartData);
  };

  const getProduct = async () => {
    const existingCartDatas = Cookies.get("addToCart");
    console.log("existingCartDatas0",JSON.parse(existingCartDatas));
    setCartData(JSON.parse(existingCartDatas));
  };

  const handelProductRemove = async (id) => {
    let privousCount = cartData.filter((item) => item.cartItem._id !== id);
    if (privousCount.length === 0) {
      navigate("/", { replace: true });
    }
    setCartData(privousCount);
  };
  function handelPrivousPage() {
    navigate("/", { replace: true });
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#001e3c",
        position: "relative",
        pt: 1,
        pb: { xs: 10 },
      }}
    >
      <Grid container spacing={1} {...other}>
        <ProductCartWidget
          addToCart={cartData.length > 0 ? cartData : cartData}
        />
        {cartData?.map((iteam, index) => (
          <Grid key={index} item xs={12}>
            {iteam?.cartItem?.productType === 'room'?
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
                    <Box sx={{ padding: "3px", mt: 1 }}>
                    <Grid container spacing={5} columns={12}>
                        <Grid item xs={12} md={4}>
                          <Typography sx={{ mt: 2, ml: 9 }}>
                            <ButtonGroup
                              sx={{ ml: 9, background: "#e6e5f7" }}
                              size="small"
                              aria-label="small outlined button group"
                            >
                              <Button
                                sx={{ color: "#000000" }}
                                onClick={() =>
                                  handleIncrement(iteam?.productId)
                                }
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
                                  onClick={() =>
                                    handleDecrement(iteam?.productId)
                                  }
                                >
                                  -
                                </Button>
                              )}
                            </ButtonGroup>
                            &nbsp; &nbsp; &nbsp;
                            {iteam?.cartItem?.productType &&
                              fCurrency(iteam?.cartItem?.price * iteam?.count)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() =>
                              handelProductRemove(iteam?.productId)
                            }
                            textAlign="right"
                          >
                            Remove To Cart
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            mb: 5,
                            ml: 9,
                            mr: 9,
                            color: "black",
                            width: "-webkit-fill-available",
                          }}
                          onClick={handelPrivousPage}
                          textAlign="right"
                        >
                          Privous
                       </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ padding: "3px", mt: 1 }}>
                      <Grid container spacing={5} columns={12}>
                        {/* <Grid item xs={12} md={6}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() => handelAddToCart(iteam?.productId)}
                          >
                            Add to Cart
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} md={12}>
                          {token ? (
                            <Link
                              to={
                                "/userDashboard/order_process/" +
                                iteam?.productId
                              }
                            >
                              <Button
                                sx={{
                                  background: "#e1dff5d1",
                                  border: "1px solid #2065d1",
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
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
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
                                }}
                              >
                                proceed to Buy
                              </Button>
                            </Link>
                          )}
                        </Grid>
                      </Grid>
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
                          <Typography variant="subtitle1" sx={{ ml: 5, p: 2 }}>
                            {
                              "Offering a comfortable and luxurious experience, the Grande Room is a space full of high-end supplies and amenities for a very pleasurable stay."
                            }
                            <Typography
                              component="span"
                              variant="body1"
                              sx={{
                                color: "text.disabled",
                                // textDecoration: "underline",
                                m: 2,
                              }}
                            >
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ m: 1, fontSize: 17 }}
                              >
                                Check-in: 12:00 NOON
                              </Typography>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ m: 1, fontSize: 17 }}
                              >
                                Check-out: 10:00 AM
                              </Typography>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ m: 1, fontSize: 17 }}
                              >
                                Cancellation: 48 Hours
                              </Typography>
                              <Typography variant="h5" color="#2065d1">
                                Child & Extra Bed Policy:{" "}
                                <Typography
                                  sx={{
                                    color: "text.secondary",
                                    lineHeight: 1.6,
                                    // ml: 7,
                                    p: 1,
                                  }}
                                >
                                  An extra bed will be provided to accommodate
                                  any child included in the booking for a charge
                                  mentioned. INR 1000 will be charged for an
                                  extra sofa cum bed per child. (To be paid at
                                  the property) An extra bed will be provided to
                                  accommodate any additional guest included in
                                  the booking for a charge mentioned. INR 1500
                                  will be charged for an extra cot per guest.
                                  (To be paid at the property) INR 1000 will be
                                  charged for an extra sofa cum bed per guest.
                                  (To be paid at the property)
                                </Typography>
                              </Typography>
                            </Typography>
                            <Typography color="#2065d1" variant="h5">
                              {" "}
                              From Relaxation to Rejuvenation!
                            </Typography>
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
                          <Grid container spacing={2} columns={12}>
                            <Grid item xs={12} md={5}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Complimentary Breakfast
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                LED TV
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Wifi Service
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Centralised AC
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Laundry / Dry Cleaning Services
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Mini Bar'
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                Personal Safety Box
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography
                                color="#000"
                                variant="subtitle1"
                                sx={{ fontSize: 17 }}
                              >
                                24 Hours Room Service
                              </Typography>
                            </Grid>
                          </Grid>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            :null}

            {/* wedding */}
            {iteam?.cartItem?.productType === 'wedding'?
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
                    <Box sx={{ padding: "3px", mt: 1 }}>
                    <Grid container spacing={5} columns={12}>
                        <Grid item xs={12} md={4}>
                          <Typography sx={{ mt: 2, ml: 9 }}>
                            <ButtonGroup
                              sx={{ ml: 9, background: "#e6e5f7" }}
                              size="small"
                              aria-label="small outlined button group"
                            >
                              <Button
                                sx={{ color: "#000000" }}
                                onClick={() =>
                                  handleIncrement(iteam?.productId)
                                }
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
                                  onClick={() =>
                                    handleDecrement(iteam?.productId)
                                  }
                                >
                                  -
                                </Button>
                              )}
                            </ButtonGroup>
                            &nbsp; &nbsp; &nbsp;
                            {iteam?.cartItem?.productType &&
                              fCurrency(iteam?.cartItem?.price * iteam?.count)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() =>
                              handelProductRemove(iteam?.productId)
                            }
                            textAlign="right"
                          >
                            Remove To Cart
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            mb: 5,
                            ml: 9,
                            mr: 9,
                            color: "black",
                            width: "-webkit-fill-available",
                          }}
                          onClick={handelPrivousPage}
                          textAlign="right"
                        >
                          Privous
                       </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ padding: "3px", mt: 1 }}>
                      <Grid container spacing={5} columns={12}>
                        {/* <Grid item xs={12} md={6}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() => handelAddToCart(iteam?.productId)}
                          >
                            Add to Cart
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} md={12}>
                          {token ? (
                            <Link
                              to={
                                "/userDashboard/order_process/" +
                                iteam?.productId
                              }
                            >
                              <Button
                                sx={{
                                  background: "#e1dff5d1",
                                  border: "1px solid #2065d1",
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
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
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
                                }}
                              >
                                proceed to Buy
                              </Button>
                            </Link>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 4, width: { xs: "100%", md: "70%" } }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1" sx={{ ml: 5, p: 2 }}>
                      {
                        "If you are really looking for a luxurious, yet vibrant Banquet hall then this is a place for you to discover more and create special memories with your loved ones on an auspicious day such as Marriage, Anniversary, Birthday, corporate events, get-together etc., if it is really a private affair"
                      }
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: "text.disabled",
                          // textDecoration: "underline",
                          m: 2,
                        }}
                      >
                      <Typography color="#2065d1" variant="h5" sx={{ m: 1, fontSize: 17 }}> Well Suited For</Typography>
                       
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ m: 1, fontSize: 17 }}
                        >
                          Big Product Launches
                        </Typography>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ m: 1, fontSize: 17 }}
                        >
                          Capacity: 3000 guests
                        </Typography>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ m: 1, fontSize: 17 }}
                        >
                          Area: 35,700 Sq. Ft
                        </Typography>
                        <Typography variant="h5" color="#2065d1">
                          Best Hotal Service :{" "}
                          <Typography
                            sx={{
                              color: "text.secondary",
                              lineHeight: 1.6,
                              // ml: 7,
                              p: 1,
                            }}
                          >
                            Welcome to King Place Banquets and Conference Halls, the
                            perfect venue for your next big event! Our stunning
                            35,700 Sq. Ft. lawn is perfect for a wide range of
                            occasions, from product launches and seminars to
                            meetings, birthday bashes, parties and wedding
                            functions and it accommodates up to 3000 guests. And
                            with our fully-customizable setups, you can add your
                            own personal touch to make your event truly
                            memorable. At King Place Banquets and Conference Halls,
                            we pride ourselves on our world-class facilities and
                            outstanding hospitality. Our team will work closely
                            with you to ensure that your event is a resounding
                            success. So if you're looking for a venue that has
                            it all, look no further than King Place Hotel.
                          </Typography>
                        </Typography>
                      </Typography>
                      <Typography color="#2065d1" variant="h5">
                        {" "}
                        Key Highlights
                      </Typography>
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
                    <Grid container spacing={2} columns={12}>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         Guest accommodation
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Bridal dressing room
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         In-house catering
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Decoration options
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         In-house sound system
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         Large parking space
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         Valet Parking 
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                        Conferences 
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                         Weddings and Receptions
                        </Typography>
                      </Grid>
                    </Grid>
                  </Typography>
                </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            :null}

            {/* food */}
            {iteam?.cartItem?.productType === 'food'?
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
                    <Box sx={{ padding: "3px", mt: 1 }}>
                      <Grid container spacing={5} columns={12}>
                        <Grid item xs={12} md={4}>
                          <Typography sx={{ mt: 2, ml: 9 }}>
                            <ButtonGroup
                              sx={{ ml: 9, background: "#e6e5f7" }}
                              size="small"
                              aria-label="small outlined button group"
                            >
                              <Button
                                sx={{ color: "#000000" }}
                                onClick={() =>
                                  handleIncrement(iteam?.productId)
                                }
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
                                  onClick={() =>
                                    handleDecrement(iteam?.productId)
                                  }
                                >
                                  -
                                </Button>
                              )}
                            </ButtonGroup>
                            &nbsp; &nbsp; &nbsp;
                            {iteam?.cartItem?.productType &&
                              fCurrency(iteam?.cartItem?.price * iteam?.count)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() =>
                              handelProductRemove(iteam?.productId)
                            }
                            textAlign="right"
                          >
                            Remove To Cart
                          </Button>
                        </Grid>
                        <Grid item xs={12} md={4}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            mb: 5,
                            ml: 9,
                            mr: 9,
                            color: "black",
                            width: "-webkit-fill-available",
                          }}
                          onClick={handelPrivousPage}
                          textAlign="right"
                        >
                          Privous
                       </Button>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ padding: "3px", mt: 1 }}>
                      <Grid container spacing={5} columns={12}>
                        {/* <Grid item xs={12} md={6}>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              mb: 5,
                              ml: 9,
                              mr: 9,
                              color: "black",
                              width: "-webkit-fill-available",
                            }}
                            onClick={() => handelAddToCart(iteam?.productId)}
                          >
                            Add to Cart
                          </Button>
                        </Grid> */}
                        <Grid item xs={12} md={12}>
                          {token ? (
                            <Link
                              to={
                                "/userDashboard/order_process/" +
                                iteam?.productId
                              }
                            >
                              <Button
                                sx={{
                                  background: "#e1dff5d1",
                                  border: "1px solid #2065d1",
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
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
                                  mb: 5,
                                  ml: 9,
                                  mr: 9,
                                  color: "black",
                                  width: "-webkit-fill-available",
                                }}
                              >
                                proceed to Buy
                              </Button>
                            </Link>
                          )}
                        </Grid>
                      </Grid>
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
                    <Typography variant="subtitle1" sx={{ ml: 5, p: 2 }}>
                      {
                        "It's a place known as a foodie's paradise. And King Place  truly lives up to its name. Hence, if you're looking for the best restaurant in Indore, look no further than King Place"
                      }
                      <Typography
                        component="span"
                        variant="body1"
                        sx={{
                          color: "text.disabled",
                          // textDecoration: "underline",
                          m: 2,
                        }}
                      >
                        <Typography variant="h5" color="#2065d1">
                          Best Hotal Service :{" "}
                          <Typography
                            sx={{
                              color: "text.secondary",
                              lineHeight: 1.6,
                              // ml: 7,
                              p: 1,
                            }}
                          >
                            Delight your taste buds with new and exciting
                            flavors at our signature restaurant, Indiya Oye.
                            Serving a variety of popular cuisines from India’s
                            varied regions, Indiya Oye blends bold spices with
                            balance and dexterity to showcase the depth of
                            India’s culinary heritage. The restaurant’s colorful
                            setting features elements of traditional Indian art
                            forms, many of which are handcrafted by skilled
                            local artisans.
                          </Typography>
                        </Typography>
                      </Typography>
                      <Typography color="#2065d1" variant="h5">
                        {" "}
                        Key Highlights
                      </Typography>
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
                    <Grid container spacing={2} columns={12}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Lunch: 12:30 PM – 03:30 PM
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Dinner 07:30 PM – 11:30 PM
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Cuisine: Pan Indian Fine Dine
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Area:800 Square feet
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography
                          color="#000"
                          variant="subtitle1"
                          sx={{ fontSize: 17 }}
                        >
                          Capacity:56 Covers
                        </Typography>
                      </Grid>
                    </Grid>
                  </Typography>
                </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            :null}
          </Grid>
        ))}
      </Grid>
      {/* <Box
        sx={{
          backgroundColor: "background.paper",
          position: "relative",
          padding: "3px",
          mt: 1,
          pb: { xs: 10 },
          borderRadius: 2,
        }}
      >
        <Typography
          color="#2065d1"
          variant="h4"
          sx={{ m: 5, fontSize: 17 }}
          >
          PRICE DETAILS
        </Typography>
        <Box sx={{ padding: "3px", ml: 5 }}>
          <Grid container spacing={5} columns={12}>
            <Grid item xs={12} md={6}>
            <Grid container spacing={2} columns={12}>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#000"
                  variant="subtitle1"
                  sx={{ fontSize: 17 }}
                >
                 Price (2 items)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#000"
                  variant="subtitle1"
                  sx={{ fontSize: 17 }}
                >
                  Complimentary Breakfast
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#000"
                  variant="subtitle1"
                  sx={{ fontSize: 17 }}
                >
                  Delivery Charges
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#000"
                  variant="subtitle1"
                  sx={{ fontSize: 17 }}
                >
                  Free
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#2065d1"
                  variant="h4"
                  sx={{ fontSize: 17 }}
                >
                 Total Amount
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  color="#2065d1"
                  variant="h4"
                  sx={{ fontSize: 17 }}
                >
                 ₹5,09,485
                </Typography>
              </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              {token ? (
              
                <Link to={"/userDashboard/order_process/"}>
                  <Button
                    sx={{
                      background: "#e1dff5d1",
                      border: "1px solid #2065d1",
                      mb: 5,
                      ml: 9,
                      mr: 9,
                      color: "black",
                      width: "-webkit-fill-available",
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
                      mb: 5,
                      ml: 9,
                      mr: 9,
                      color: "black",
                      width: "-webkit-fill-available",
                    }}
                  >
                    proceed to Buy
                  </Button>
                </Link>
              )} 
            </Grid>
          </Grid>
        </Box>
      </Box> */}
    </Box>
  );
}
