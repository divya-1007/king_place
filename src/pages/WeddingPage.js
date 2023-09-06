import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import {
  Container,
  Stack,
  Typography,
  Button,
  Popover,
  Box,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";
import Iconify from "../components/iconify";
import { LoadingButton } from "@mui/lab";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
// components
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar,
  WeddingPages,
} from "../sections/@dashboard/products";
import { toast } from "react-toastify";
import useResponsive from '../hooks/useResponsive';

import './style.css'
// mock
import {Postrequest, GetRequest } from "../apicall/index";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [productData, setProductData] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const getProduct = async (token) => {
    await GetRequest("api/product/all-product?type=wedding", token)
      .then((response) => {
        if (response?.data) {
          setProductData(response?.data?.productData);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getProduct(token);
  }, []);
  
  function handelPrivousPage(){
    navigate('/dashboard/app', { replace: true });
  }
  return (
    <>
      <Helmet>
        <title> Dashboard: Wedding | King Place </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5, color: "#ffffff" }}>
        Wedding Products
        </Typography>
       
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <WeddingPages products={productData} />
        <LoadingButton  sx={{ background: "#001e3c", mt: 5 ,p:2 ,color:'#ffffff',spacing:3 }}
        size="large"
        variant="contained" onClick={handelPrivousPage}>privous</LoadingButton>
        <ProductCartWidget />
        <ProductCartWidget />
      </Container>
    </>
  );
}
