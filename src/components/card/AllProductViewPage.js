import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import {
  Container,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Link, RouterLink } from 'react-router-dom';


// components 
import {
  ProductFilterSidebar,
} from "../../sections/@dashboard/products";
import AllProductView from "./AllProductView"

import { toast } from "react-toastify";
import useResponsive from '../../hooks/useResponsive';
import './style.css'
// mock
import {GetRequest } from "../../apicall/index";


// ----------------------------------------------------------------------

export default function AllProductViewPage({ProductType}) {
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

  const handleChildData = (dataFromChild) => {

    const sortByPriceAsc = (a, b) => a.price - b.price;
    const sortByPriceDesc = (a, b) => b.price - a.price;
    // Sort productData based on price in ascending order
    const sortedProductsAsc = productData.slice().sort(sortByPriceAsc);

    // Sort productData based on price in descending order
    const sortedProductsDesc = productData.slice().sort(sortByPriceDesc);

    if(dataFromChild?.selectedPrice === '-1') {
      return setProductData(sortedProductsDesc);
    }else if(dataFromChild?.selectedPrice === '1'){
      return setProductData(sortedProductsAsc);
    }
    getProduct(dataFromChild?.selectedCategory ,'filter');

  };

  const getProductData = async (type) => {
    await GetRequest("api/product/all-product?type="+type)
    .then((response) => {
      if (response?.data) {
        setProductData(response?.data?.productData);
        setOpenFilter(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

 
  const getProduct = async (type ,filterData) => {
    if(filterData === 'filter'){
      console.log(type);
      ProductType(type)
      getProductData((type).toLowerCase())
    }else{
      ProductType(type)
      getProductData(type)
    }
  };



  useEffect(() => {
    const params = new URLSearchParams(window.location.search) 
    let type = params.get('type')
    getProduct(type);
  }, []);
  

  function handelPrivousPage(){
    navigate('/', { replace: true });
  }

  return (
    <>
      <Helmet>
        <title> All Products | King Place </title>
      </Helmet>

      <Container>
        
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onDataFromChild={handleChildData}
            />
            {/* <ProductSort /> */}
          </Stack>
        </Stack>
        <AllProductView products={productData}/>
          <LoadingButton  sx={{ background: "#001e3c", mt:5 ,p:2 ,color:'#ffffff',spacing:3 }}
        size="large"
        variant="contained" onClick={handelPrivousPage}>privous</LoadingButton>
      </Container>
    </>
  );
}
