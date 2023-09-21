import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Grid,
  Stack,
  ButtonGroup,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";
// components
import { fCurrency } from "../../utils/formatNumber";
// components
import { toast } from "react-toastify";
// import USERLIST from '../_mock/user';
import { Postrequest } from "../../apicall/index";
// import products from "src/_mock/products";
import MainScreen from "./index"
import Cookies from 'js-cookie';

export default function InvoiceForm({ step,setActiveStep, usersData }) {
  const [loading, setLoading] = useState(false);
  const [country,setCountry] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [zipCode,setZipCode] = useState();
  const [address,setAddress] = useState();
  let LocalStorage = JSON.parse(localStorage.getItem("user"))
  const tokenSet = JSON.parse(localStorage.getItem("token"))
 

  const handelShipping =(e)=>{
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);
    let empty = ""
    if(!country){
        empty = "country"
    }else if(!phoneNumber){
        empty = "Phone Number"
    }else if(!zipCode){
        empty = "Zip Code"
    }else if(!address){
        empty = "Address"
    }
    if(empty){
        toast.error(`Please provide a ${empty}`,{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'toast-message-error',
          theme: "light",
        })
        return
    }

    let storeData ={
      customerId:LocalStorage?._id,
      productId:usersData?.cartItem?._id,
      country:country,
      phoneNumber:phoneNumber,
      zipCode:zipCode,
      address:address,
      productName:usersData?.cartItem?.productName,
      productType:usersData?.cartItem?.productType,
      quentity:usersData?.count,
      price:usersData?.cartItem?.price * usersData?.count,
      product_image:usersData?.cartItem?.product_image,
      currency:"USD",
    }
    console.log(storeData ,"dvfjnv");

    Postrequest('/api/orders/create-order',storeData,{headers:{
      "Content-Type": "application/json" ,
      Authorization: `Bearer ${tokenSet}`}})
    .then((response)=>{

      if(response.status){
        localStorage.setItem("paymentData", JSON.stringify(response?.data?.Product));
        toast.success("Sucessfully Shipping Process",{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'toast-message-sucess',
          theme: "light",
        })
        setTimeout(function () {
          setActiveStep(2)
        }, 2000)
        setCountry("")
        setPhoneNumber("")
        setZipCode("")
        setAddress("")
       }
    }).catch((error)=>{
      console.log(error?.response?.data ,"aya");
      if(error?.response?.data?.status ==409){
        toast.success(`${error?.response?.data?.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'toast-message-error',
          theme: "light",
          });
        setTimeout(() => {
          setLoading(false);
        },3000);
      }else{
        toast.error(`${error?.response?.data?.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: 'toast-message-error',
          theme: "light",
          });
        setTimeout(() => {
          setLoading(false);
        },3000);
      }

    })
  }
  useEffect(()=>{
    const existingCartDataString = Cookies.get("ProductDetail");
  })

  // eslint-disable-next-line default-case
  switch (step) {
    case 0:
      return (
        <Card >
          {usersData?.cartItem?.productType === "room"?
          <Box
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              position: "relative",
              pt: 1,
              pb: { xs: 10 },
              // eslint-disable-next-line no-dupe-keys
              backgroundImage:'url(/backgroundS.png)',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',backgroundOrigin: 'content-box',width:'100%'
            }}
          >
            <Grid container columns={12}>
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: "3px", mt: 1 }}>
                  <img
                    src={usersData?.cartItem?.product_image}
                    alt={usersData?.cartItem?.productName}
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
                        {usersData?.cartItem?.productName}
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
                          {usersData?.status}
                        </Typography>
                        &nbsp;
                        {usersData?.cartItem?.productType && fCurrency(usersData?.cartItem?.price*usersData?.count)}
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
                        `An extra bed will be provided to accommodate
                        any child included in the booking for a charge
                        mentioned. INR 1000 will be charged for an
                        extra sofa cum bed per child. (To be paid at
                        the property) An extra bed will be provided to
                        accommodate any additional guest included in
                        the booking for a charge mentioned. INR 1500
                        will be charged for an extra cot per guest.
                        (To be paid at the property) INR 1000 will be
                        charged for an extra sofa cum bed per guest.
                        (To be paid at the property)`
                      }
                      {/* {products?.productDescription} */}
                    </Typography>
                    <Typography
                          sx={{
                            color: "text.secondary",
                            lineHeight: 1.6,
                            ml: 7,
                            p: 1,
                          }}
                        >
                           <Typography color="#2065d1" variant="h5">
                              {" "}
                              From Relaxation to Rejuvenation!
                            </Typography>
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
                    <Typography sx={{ mt: 2, ml: 9 }}>
                      Quantity
                      <ButtonGroup
                        sx={{ ml: 9, background: "#e6e5f7" }}
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button sx={{ color: "#000000" }}>
                          {usersData?.count}
                        </Button>
                      </ButtonGroup>
                    </Typography>
                  </Box>
                  {/* <Button
                    sx={{
                      background: "#e1dff5d1",
                      border: "1px solid #2065d1",
                      mb: 5,
                      ml: 9,
                      mr: 9,
                      color: "black",
                    }}
                    >
                    continous
                  </Button> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          :null}

           {usersData?.cartItem?.productType === "wedding"?
          <Box
            sx={{
              width: "100%",
              backgroundColor: "background.paper",
              position: "relative",
              pt: 1,
              pb: { xs: 10 },
              // eslint-disable-next-line no-dupe-keys
              backgroundImage:'url(/backgroundS.png)',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',backgroundOrigin: 'content-box',width:'100%'
            }}
          >
            <Grid container columns={12}>
              <Grid item xs={12} md={6}>
                <Box sx={{ padding: "3px", mt: 1 }}>
                  <img
                    src={usersData?.cartItem?.product_image}
                    alt={usersData?.cartItem?.productName}
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
                        {usersData?.cartItem?.productName}
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
                          {usersData?.status}
                        </Typography>
                        &nbsp;
                        {usersData?.cartItem?.productType && fCurrency(usersData?.cartItem?.price*usersData?.count)}
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
                        `Welcome to King Place Banquets and Conference Halls, the
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
                        it all, look no further than King Place Hotel.`
                      }
                      {/* {products?.productDescription} */}
                    </Typography>
                    <Typography
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6,
                      ml: 7,
                      p: 1,
                    }}
                  >
                    <Typography color="#2065d1" variant="h5">
                        {" "}
                        Key Highlights
                      </Typography>
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
                    <Typography sx={{ mt: 2, ml: 9 }}>
                      Quantity
                      <ButtonGroup
                        sx={{ ml: 9, background: "#e6e5f7" }}
                        size="small"
                        aria-label="small outlined button group"
                      >
                        <Button sx={{ color: "#000000" }}>
                          {usersData?.count}
                        </Button>
                      </ButtonGroup>
                    </Typography>
                  </Box>
                  {/* <Button
                    sx={{
                      background: "#e1dff5d1",
                      border: "1px solid #2065d1",
                      mb: 5,
                      ml: 9,
                      mr: 9,
                      color: "black",
                    }}
                    >
                    continous
                  </Button> */}
                </Box>
              </Grid>
            </Grid>
          </Box>
          :null}

        {usersData?.cartItem?.productType === "food"?
          <Box
           sx={{
            width: "100%",
            backgroundColor: "background.paper",
            position: "relative",
            pt: 1,
            pb: { xs: 10 },
            backgroundImage: "url(/backgroundS.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundOrigin: "content-box",
            width: "100%",
          }}
        >
          <Grid container columns={12}>
            <Grid item xs={12} md={6}>
              <Box sx={{ padding: "3px", mt: 1 }}>
                <img
                  src={usersData?.cartItem?.product_image}
                  alt={usersData?.cartItem?.productName}
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
                      {usersData?.cartItem?.productName}
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
                        {usersData?.status}
                      </Typography>
                      &nbsp;
                      {usersData?.cartItem?.productType &&
                        fCurrency(
                          usersData?.cartItem?.price * usersData?.count
                        )}
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
                    {`Delight your taste buds with new and exciting
                     flavors at our signature restaurant, Indiya Oye.
                     Serving a variety of popular cuisines from India’s
                     varied regions, Indiya Oye blends bold spices with
                     balance and dexterity to showcase the depth of
                     India’s culinary heritage. The restaurant’s colorful
                     setting features elements of traditional Indian art
                     forms, many of which are handcrafted by skilled
                     local artisans.`}
                    {/* {products?.productDescription} */}
                  </Typography>
                  <Typography
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                  ml: 7,
                  p: 1,
                }}
              >
                <Typography color="#2065d1" variant="h5">
                    {" "}
                    Key Highlights
                  </Typography>
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
                  <Typography sx={{ mt: 2, ml: 9 }}>
                    Quantity
                    <ButtonGroup
                      sx={{ ml: 9, background: "#e6e5f7" }}
                      size="small"
                      aria-label="small outlined button group"
                    >
                      <Button sx={{ color: "#000000" }}>
                        {usersData?.count}
                      </Button>
                    </ButtonGroup>
                  </Typography>
                </Box>
                {/* <Button
                sx={{
                  background: "#e1dff5d1",
                  border: "1px solid #2065d1",
                  mb: 5,
                  ml: 9,
                  mr: 9,
                  color: "black",
                }}
                >
                continous
              </Button> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
          :null}
        </Card>
      );
    case 1:
      return (
        <Card sx={{backgroundImage:'url(/backgroundS.png)',backgroundRepeat: 'no-repeat',backgroundSize: 'cover',backgroundPosition: 'center',backgroundOrigin: 'content-box',width:'100%',height:550}}>
          <Box sx={{ p: "1rem", height:'100%',marginTop:'9rem'}}>
            <Grid container spacing={3} columns={12}>
              <Grid item  xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" ,border:'2px solid #000',borderRadius:'0.5rem', }}
                  name="country"
                  label="Destination Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Grid>
              <Grid item  xs={12} md={6}>
                <TextField
                  sx={{ width: "100%" ,border:'2px solid #000',borderRadius:'0.5rem'}}
                  name="phoneNumber"
                  label="Destination Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%",border:'2px solid #000',borderRadius:'0.5rem' }}
                  name="zipCode"
                  label="Destination Zip Code"
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </Grid>
              <Grid Grid item xs={12} md={6}>
                <TextField
                  sx={{ width: "100%",border:'2px solid #000' ,borderRadius:'0.5rem' }}
                  name="address"
                  label="Destination Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Button onClick={handelShipping} sx={{
                      background: "#001e3c",
                      border: "1px solid #000",
                      float: 'right',
                       p:2,
                       m:3,
                      color: "#fff",
                    }}>Submit</Button>
            </Grid>
          </Box> 
        </Card>
      );
    case 2:
      return (
        <MainScreen productId={usersData?.cartItem?._id} setActiveStep={setActiveStep} />
      );
    case 3:
      return (
        <Card>
        <Box sx={{ p: "1rem", background:'linear-gradient(135deg,#2f33a7,#4d53e0 25%,#00a5ff)',height:'100%'  }}>
        <Typography variant="h2" sx={{textAlign:'center',color:'#fff'}}>Payment Process Complete !</Typography>
          <img src='/thankyou.jpg' alt="thank_you" />
        {/* <Typography variant="h5" sx={{color:'#fff'}}>Dear customer, thank you for your purchase with Flatlogic! In your mailbox you will find the invoice for your purchase.</Typography> */}
        </Box>
        </Card>
       
      );
  }
}
