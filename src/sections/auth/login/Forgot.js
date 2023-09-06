import { useState } from "react";
// @mui
import {Stack, TextField, Checkbox ,Container,Box, Typography} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
// components
import { toast } from "react-toastify";
import { Postrequest } from "../../../apicall/index";
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
// import CircularIntegration from "./CheckLoading";
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

// ----------------------------------------------------------------------

export default function ForgotForm() {
  // const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);
    let empty = "";
    if (!email) {
      empty = "Email";
    }
    if (empty) {
      toast.error(`Please provide a ${empty}`);
      setTimeout(() => {
        setLoading(false);
      },3000);
      return;
    }

    const user = {
      email,
    };

    console.log(user);
    const responseDetails = await Postrequest("/api/users/forgotpassword", user);
  
    if (responseDetails.status) {
      toast.success("Sucessfully Forget Password");
      setTimeout(() => {
        setTimeout(function () {
          window.location.href = "/login"
        }, 2000)
        setLoading(false);
      }, 3000);
      setEmail("");
    } else {
    
      if(responseDetails?.response?.data?.status ==false){
        toast.error(`${responseDetails?.response?.data?.message}`);
        setTimeout(() => {
          setLoading(false);
        },3000);
      }else{
        toast.error("invalid Data");
        setTimeout(() => {
          setLoading(false);
        },3000);
      }
    }

    // navigate("/dashboard", { replace: true });
  };
  console.log(loading ,"loading");

  return (
    <>
      <Helmet>
        <title> Forgot Password | King Place Hotal </title>
      </Helmet>
      <StyledRoot>
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
            Forgot Password to King Place Hotal
            </Typography>
            <Typography variant="body2" sx={{ mb: 5 }}>
              Already a member? Login here {""}
              <Link variant="subtitle2" to={"/Login"}>
                Get started
              </Link>
            </Typography>
            <Stack spacing={3}>
              <TextField
                name="email"
                label="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              
            </Stack>
         
            <LoadingButton
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
             </Box>: 'Forgot Password'}
            
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
            {/* <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome King Place Hotal
            </Typography> */}
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
