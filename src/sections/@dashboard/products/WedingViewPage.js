import PropTypes from "prop-types";
import { useState, useEffect } from "react";

// @mui
import { Box, Card, Grid, Typography, Stack,Button } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
// components
import Label from "../../../components/label";
import { ColorPreview } from "../../../components/color-utils";
import { GetRequest } from "../../../apicall/index";
import { useNavigate, useParams } from "react-router-dom";
import WeddingPages from "../products/WeddingPages"
// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "50%",
  height: "50%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function WeddingViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [commanProduct, setCommanProduct] = useState([]);


  const getProduct = async (token) => {
    await GetRequest(`api/product/single-product/${id}`, token)
      .then((response) => {
        if (response?.data) {
          setProduct(response?.data?.productData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCommanProduct = async (token) => {
    await GetRequest(`api/product/comman-product/${id}`, token)
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
    const token = JSON.parse(localStorage.getItem("token"));
    getProduct(token);
    setTimeout(()=>{
      console.log("check Data")
      getCommanProduct(token);
    }, 1000)
  }, [id]);
  

  function handelPrivousPage(){
    navigate('/dashboard/'+product?.productType, { replace: true });
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
        <Grid container columns={16}>
          <Grid item xs={10} md={9}>
            <Box sx={{ padding: "3px", mt: 1 }}>
              <img
                src={product?.product_image}
                alt={product?.productName}
                width={1100}
                height={600}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={7}>
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
                       {product?.status}
                    </Typography>
                    &nbsp;
                    {product?.productType && fCurrency(product?.price)}
                  </Typography>
                </Stack>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.6, ml: 7, p: 1 }}>
                  {
                    "Grand Palace Hotel Services Banquet facilities,Bar, Computer facility,Conference and meeting facilities,Disabled room,Fitness room,Sauna,Luggage storage,More items...  They include common hotel room items such as TVs, sound systems, refrigerators, mini-bars, free Wi-Fi, coffee-makers, hairdryers and more. Amenities often include personal items like the toiletries the hotel provides. They can also include things that make a room more comfortable, such as air-conditioning"
                  }
                </Typography>
                <Button sx={{background:'#e1dff5d1', ml: 9, p: 2 ,color:'black'}} onClick={handelPrivousPage} textAlign="left">Privous</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="subtitle1" sx={{ml: 5, p: 1,fontSize:'2rem'}}>Product Type {product?.productType}</Typography>
      {product?.productType ?
      <WeddingPages products={commanProduct} />
      :null}
    </Card>
  );
}
