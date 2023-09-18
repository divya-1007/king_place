import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
// @mui
import {
  Container,
  Stack,
  Typography,
  Box,
  Grid,
  FormControl,
  TextField,
} from "@mui/material";
import Iconify from "../components/iconify";
import { LoadingButton } from "@mui/lab";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import useResponsive from '../hooks/useResponsive';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css';

// ----------------------------------------------------------------------

export default function AddProduct() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const [opens, setOpens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productName ,setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [product_image, setProduct_image] = useState('');
  const [status, setStatus] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');

  const tokenData = JSON.parse(localStorage.getItem("token"))
  const userData = JSON.parse(localStorage.getItem("user"))


  const handleClose= (event)=>{
    navigate('/dashboard/app', { replace: true });
  }

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
    }else if (status === "" ||status === null ||status === undefined) {
      empty = "Status"
      valid = false
    }else if(productDescription === "" || productDescription === null || productDescription === undefined){
      empty = "Area"
      valid = false
    }
  
    return {valid:valid,empty:empty};
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('product_image', product_image)
    formData.append('productName', productName)
    formData.append('price', price)
    formData.append('productType', productType)
    formData.append('status', status)
    formData.append('productDescription', productDescription)
    formData.append('userId', userData._id)
    console.log(userData._id ,"soajd")

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
   console.log(formData);
    
  await axios.post('api/product/create-product', formData ,{headers:{
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
        navigate('/dashboard/'+productType+'_product', { replace: true });
        setLoading(false);
      }, 1000)
      setProductName("")
      setProductType("")
      setPrice("")
      setProductDescription("")
      setProduct_image("")
      setStatus("")
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

 

  return (
    <>
      <Helmet>
        <title> Dashboard: Add Products | King Place </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5, color: "#ffffff" }}>
          Add Products
        </Typography>
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
                        value={productName}
                        placeholder="Product Name"
                        onChange={(e) => setProductName(e.target.value)}
                        type="text"
                      />
                   </div>
                  </Grid>
                  <Grid item  sm={4} md={4}>
                  <div className="form-item">
                    <label className='text-primary'>Price</label>
                      <input
                        value={price}
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        />
                      </div>
                  </Grid>
                  <Grid item  sm={4} md={4}>
                  <div className="form-item">
                    <label htmlFor="productType">Product Type</label>
                    <select name="productType" id="cars" defaultValue={productType} onChange={(e)=>setProductType(e.target.value)}>
                      <option selected="selected" value="room">Room</option>
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
                      className="custom-file-input"
                      name='product_image'
                      onChange={(e) => setProduct_image(e.target.files[0])}
                      size="lg" />
                      </div>
                     
                  </Grid>
                  <Grid item  sm={4} md={4}>
                  <div className="form-item">
                     <label htmlFor='status'> Product Status</label>
                     <select name="status" id="car" defaultValue={status} onChange={(e)=>setStatus(e.target.value)}>
                      <option selected="selected" value="new">New</option>
                      <option value="sale">Sale</option>
                      <option value="out">Out Of Stoke</option>
                    </select>
                        </div>
                  </Grid>
                  <Grid item  sm={4} md={4}>
                  <div className="form-item">
                    <label className='text-primary'> Area</label>
                      <input
                        value={productDescription}
                        placeholder="Product Description"
                        onChange={(e) => setProductDescription(e.target.value)}
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
                    "Create Product"
                  )}
                </LoadingButton>
                <LoadingButton  sx={{ background: "#001e3c", mt: 5 ,p:2 ,color:'#ffffff',spacing:3 }}
                  size="large"
                  variant="contained" onClick={handleClose}>Close</LoadingButton>
                  </form>
                </Stack>
            </Box>
      </Container>
    </>
  );
}
