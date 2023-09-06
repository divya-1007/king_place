import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
// components
import Iconify from "../../../components/iconify";
import { toast } from "react-toastify";
import  {Postrequest} from '../../../apicall/index';
import { Helmet } from 'react-helmet-async';
// @mui
import {styled} from '@mui/material/styles';
import './style.css';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';

// ----------------------------------------------------------------------
const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 980,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(15, 0),
  }));

export default function ResetPassword() {
    const { id ,otp} = useParams();
//   const navigate = useNavigate();
console.log(id ,otp,"aya");
  const mdUp = useResponsive('up', 'md');
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);
  const handleClick = async(e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);
    let empty = "";
    if (!conformPassword) {
      empty = "Conform Password";
    } else if (!newPassword) {
      empty = "Password";
    }
  
    if (empty) {
      toast.error(`Please provide a ${empty}`);
      return;
    }
   
    if(newPassword !== conformPassword){
      toast.error("Password And Conform Password can't match");
    }

    const user = {
        newPassword,
        id,otp,
    }
  
     await Postrequest('api/users/resetpassword',user)
    .then((response)=>{

      if(response.status){
        toast.success("Sucessfully reset Your Password",{
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
          window.location.href = "/login";
        }, 4000)
        setNewPassword("")
       }
    }).catch((error)=>{
      console.log(error?.response?.data ,"aya");
      if(error?.response?.data?.status ==409){
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

  return (
    <>
     <Helmet>
        {/* <title> Reset | King Place Hotal </title> */}
      </Helmet>

      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{ my: 4 }}>
              Reset to King Place Hotal
            </Typography>
            
      <Stack spacing={3}>

        <TextField
          name="newPassword"
          label="Password"
          onChange={(e) => setNewPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="conformPassword"
          label="Conform Password"
          onChange={(e) => setConformPassword(e.target.value)}
          type={showPassword ? "text" : "conformPassword"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton
        sx={{ my: 4 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        {loading ? 
            <Box sx={{ height: 40 }}>
            <Typography sx={{padding:1}}>Please Wait........</Typography>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? '500ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress 
              size={40}
              sx={{
                color: '#ffffff',
                position: 'absolute',
                zIndex: 1,
                left: 1,
                marginLeft:5,
                padding:0.5,
                top:2,
              }}
              />
            </Fade>
             </Box>: 'Reset Password'}
      </LoadingButton>
      </StyledContent>
        </Container>
       
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              {/* Hi, Welcome King Place Hotal */}
            </Typography>
            {/* <img
              src="/images/service.webp"
              alt="login"
              height="100%"
              style={{ px: 2 }}
            /> */}
          </StyledSection>
        )}
      </StyledRoot>
    </>
  );
}
