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
} from "../sections/@dashboard/products";
import { toast } from "react-toastify";
import useResponsive from '../hooks/useResponsive';
import './style.css'
// mock
import PRODUCTS from "../_mock/products";
import {Postrequest, GetRequest } from "../apicall/index";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const mdUp = useResponsive('up', 'md');
  const [openFilter, setOpenFilter] = useState(false);
  const [opens, setOpens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName ,setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [product_image, setProduct_image] = useState('');
  const [status, setStatus] = useState('');
  const[tokenData ,setTokenData] = useState('')
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');

  const [productData, setProductData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"))
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  
  const handleOpenMenu = (event) => {
    setOpens(true);
  };
  const handleClose= (event)=>{
    setOpens(false);
  }
 
  const getProduct = async (token) => {
    await GetRequest("api/product/all-product", token)
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

  // validation
  let checkvalidation = () => {
    let valid = true;
    let empty = ""
    if(productName === "" ||productName === null ||productName === undefined){
        empty = "Product Name"
        valid = false
    }else if(!productType === "" ||productType === null ||productType === undefined){
        empty = "Product Type"
        valid = false
    }else if(price === "" ||price === null ||price === undefined){
        empty = "price"
        valid = false
    // }else if(product_image === "" ||product_image === null ||product_image === undefined){
    //     empty = "Product Image"
    //     valid = false
    }else if (status === "" ||status === null ||status === undefined) {
      empty = "Status"
      valid = false
    }else if(area === "" || area === null || area === undefined){
      empty = "Area"
      valid = false
    }
  
    return {valid:valid,empty:empty};
  }

  const handleClick = async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.append('product_image', product_image);
     setProduct_image(product_image)
    // console.log( "check",product_image);
    

    const valid = checkvalidation();
    console.log("☢️ ~ file: index.js ~ line 148 ~ handleSubmit ~ valid", valid)
    if (!valid.valid) {
      toast.error(`Please Enter ${valid?.empty}`,{
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
      return false;
    }
    setLoading((prevLoading) => !prevLoading);
   
    const user = {
      productName:productName,
      productType:productType,
      price:productType,
      product_image:product_image,
      status:status,
      area:area,
    }
  // console.log("check" ,user);
 await Postrequest('api/product/create-product',user,tokenData)
  .then((response)=>{

    if(response.status){
      toast.success("Sucessfully Signup",{
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
        setOpens(false);
      }, 2000)
      setProductName("")
      setProductType("")
      setPrice("")
      setArea("")
      setProduct_image("")
      setStatus("")
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
    

  };


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    setTokenData(token)
    getProduct(token);
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | King Place </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5, color: "#ffffff" }}>
          Products
        </Typography>
        <Button
          variant="contained"
          sx={{ mr: 2 ,backgroundColor:'rgb(32 101 209 / 1%)' ,color:'#ffffff'}}
          onClick={handleOpenMenu}
          startIcon={<Iconify icon="eva:edit-fill" />}
        >
          Add Product
        </Button>
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
        {opens == false ? (
          <ProductList products={productData} />
            ) : (
           <>
            <Box 
              component="form"
              sx={{
                "& .MuiTextField-root": {  width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
            

              
              <Stack
               className="product_head"
              >
                <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                sx={{
                  background: "#001e3c",
                  color: "#ffffff",
                  height: "60px",
                  display: "block",
                  textAlign: "center",
                  opacity: 1,
                  p: 1.5,
                  boxShadow: '0 5px 16px 0 rgba(32, 101, 209, 0.24)',
                  borderRadius: 10,
                  margin: 5,
                  transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                }}
              >
                Create Product Data
              </Typography>
              <form onSubmit={handleClick} method="POST" encType='multipart/form-data'>
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="productName"
                      label="Product Name"
                      focused
                      onChange={(e) => setProductName(e.target.value)}
                    />
                   
                  </Grid>
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="price"
                      label="Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    
                  </Grid>
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="productType"
                      label="Product Type"
                      onChange={(e) => setProductType(e.target.value)}
                    />
                    
                  </Grid>
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="product_image"
                      label="Product Image"
                      type='file'
                      onChange={(e)=>setProduct_image(e.target.files[0])}
                    />
                     
                  </Grid>
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="status"
                      label="Status"
                      onChange={(e) => setStatus(e.target.value)}
                    />
                     
                  </Grid>
                  <Grid item  sm={4} md={4}>
                    <TextField
                      name="area"
                      label="Area"
                      onChange={(e) => setArea(e.target.value)}
                    />

                  </Grid>
                </Grid>
              
                <LoadingButton
                  sx={{ background: "#001e3c", mt: 5 ,color:'#ffffff',marginRight: "135px" }}
                  size="large"
                  variant="contained"
                  onClick={handleClick}
                >
                  {loading ? (
                    <Box sx={{ height: 40 }}>
                      <Typography sx={{ padding: 1 }}>
                        Please Wait........
                      </Typography>
                      <Fade
                        in={loading}
                        style={{
                          transitionDelay: loading ? "500ms" : "0ms",
                        }}
                        unmountOnExit
                      >
                        <CircularProgress
                          size={40}
                          sx={{
                            color: "#ffffff",
                            position: "absolute",
                            zIndex: 1,
                            left: 1,
                            marginLeft: 5,
                            padding: 0.5,
                            top: 2,
                          }}
                        />
                      </Fade>
                    </Box>
                  ) : (
                    "Create Product"
                  )}
                </LoadingButton>
                <LoadingButton  sx={{ background: "#001e3c", mt: 5 ,p:2 ,color:'#ffffff',spacing:3 }}
                  size="large"
                  variant="contained" type="submit">Close</LoadingButton>
                  </form>
                </Stack>
            </Box>
           </>
        )}
        <ProductCartWidget />
        
      </Container>
      
    </>
  );
}
