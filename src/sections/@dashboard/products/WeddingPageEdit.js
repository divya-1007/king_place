import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
// @mui
import {
  Container,
  Stack,
  Typography,
  Button,
  Popover,
  Box,
  Grid,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import { LoadingButton } from "@mui/lab";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";

import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// mock
import {Postrequest, GetRequest } from "../../../apicall/index";

export default function WeddingPageEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [openFilter, setOpenFilter] = useState(false);
  const [opens, setOpens] = useState(false);
  const [loading, setLoading] = useState(false);
  const[tokenData ,setTokenData] = useState('')
  const [product, setProduct] = useState({
    id:id,
    userId:'',
    productName:'',
    productType:'',
    product_image:'',
    status:'',
    price:'',
    productDescription:''
  });


  const userData = JSON.parse(localStorage.getItem("user"))
  
 
  const handleClose= (event)=>{
    setOpens(false);
    navigate('/dashboard/wedding', { replace: true });
  }
  const getProduct = async (token) => {
    await GetRequest(`api/product/single-product/${id}`, token)
      .then((response) => {
        if (response?.data) {
          setProduct(response?.data?.productData);
          setProduct({...product,
            userId:response?.data?.productData?.userId,
            productName:response?.data?.productData?.productName,
            productType:response?.data?.productData?.productType,
            product_image:response?.data?.productData?.product_image,
            status:response?.data?.productData?.status,
            price:response?.data?.productData?.price,
            productDescription:response?.data?.productData?.productDescription
          })
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // validation

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("product",product);

    setLoading((prevLoading) => !prevLoading);
   
    
  await axios.post('api/product/create-product', product ,{headers:{
    "Content-Type": "multipart/form-data" ,
    Authorization: `Bearer ${tokenData}`,
    }}).then((response)=>{

    if(response.status){
      toast.success("Sucessfully Product Save",{
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
        setLoading(false);
        navigate('/dashboard/'+product?.productType, { replace: true });
      }, 1000)
     }
  }).catch((error)=>{
    console.log(error?.response?.data ,"aya");
    if(error?.response?.data?.status ==409){
      toast.success(`${error?.response?.data}`, {
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
      toast.error(`${error?.response?.data}`, {
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
    getProduct(token);
  }, [id]);

  return (
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
      Update Product Details
    </Typography>
    <form  method="POST" encType='multipart/form-data'>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item  sm={4} md={4}>
        <div className="form-item">
        <label className='text-primary'>Product Name</label>
          <input
              defaultValue={product.productName}
              name='productName'
              placeholder='productName'
              onChange={(e) => setProduct({...product ,productName:e.target.value})}
              type="text"
            />
         </div>
        </Grid>
        <Grid item  sm={4} md={4}>
        <div className="form-item">
          <label className='text-primary'>Price</label>
            <input
              defaultValue={product?.price}
              name='price'
              placeholder='Price'
              onChange={(e) => setProduct({...product ,price:e.target.value})}
              type="number"
              />
            </div>
        </Grid>
        <Grid item  sm={4} md={4}>
        <div className="form-item">
          <label htmlFor="productType">Product Type</label>
          <select name="productType" onSelect={product?.productType} id="cars" onChange={(e)=>setProduct({...product ,productType:e.target.value})}>
            <option value="room">Room</option>
            <option value="food">Food</option>
            <option value="wedding">Wedding</option>
          </select>
             </div>
          
        </Grid>
        <Grid item  sm={4} md={4}>
        <div className="form-item">
          <label className='text-primary'>Product Image</label>
          <input
            type="file"
            defaultValue={product?.product_image}
            className="custom-file-input"
            name='product_image'
            onChange={(e) => setProduct({...product ,product_image:e.target.files[0]})}
            size="lg" />
            </div>
           
        </Grid>
        <Grid item  sm={4} md={4}>
        <div className="form-item">
           <label htmlFor='status'> Product Status</label>
           <select name="productType" defaultValue={product?.status} id="car" onChange={(e)=>setProduct({...product, productType:e.target.value})}>
            <option value="new">New</option>
            <option value="sale">Sale</option>
            <option value="out">Out Of Stoke</option>
          </select>
              </div>
        </Grid>
        <Grid item  sm={4} md={4}>
        <div className="form-item">
          <label className='text-primary'>Product Description</label>
            <input
              defaultValue={product?.productDescription}
              name='productDescription'
              placeholder="Product Description"
              onChange={(e) => setProduct({...product,productDescription:e.target.value})}
              type="text"
              />
              </div>
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
          "Update Product"
        )}
      </LoadingButton>
      <LoadingButton  sx={{ background: "#001e3c", mt: 5 ,p:2 ,color:'#ffffff',spacing:3 }}
        size="large"
        variant="contained" onClick={handleClose}>Close</LoadingButton>
        </form>
      </Stack>
  </Box>
  );
};

