import { Helmet } from 'react-helmet-async';
import React, {useState, useEffect, useRef } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button } from '@mui/material';
import { Link, RouterLink } from 'react-router-dom';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';

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
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [state, setState] = useState({
    mobileView: false,
  });

  const { mobileView } = state;
  
  if(mobileView == true){
  let styleData = document.querySelector('body');
  styleData.style.width = 'fit-content';
  }else{
    let styleData = document.querySelector('body');
    styleData.style.width = '100%';
  }
  const mdUp = useResponsive('up', 'md');
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    }
  }, []);

  return (
    <>
      <Helmet>
        <title> Login | King Place Hotal  </title>
      </Helmet>

      <StyledRoot>
      <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{color:'#fff'}}>
              Sign in to King Place Hotal
            </Typography>

            <Typography variant="body2" sx={{ mb: 5,color:'#fff' }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" to={'/signup'}>Sign UP</Link>
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button fullWidth size="large"  sx={{border: '1px solid #fff'}} variant="outlined">
                <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" sx={{border: '1px solid #fff'}} variant="outlined">
                <Iconify icon="eva:facebook-fill" color="#1877F2" width={22} height={22} />
              </Button>

              <Button fullWidth size="large" sx={{border: '1px solid #fff'}} variant="outlined">
                <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={22} height={22} />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: '#fff' }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
          </StyledContent>
        </Container>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            {/* <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Data Warehouse
            </Typography> */}
            {/* <img src='/images/certificate.png' alt='login' /> */}
            {/* <img src="/assets/illustrations/illustration_login.png" alt="login" /> */}
            {/* <img src="/images/service.webp" alt="login" height='100%' style={{px:2}} /> */}
          </StyledSection>
        )}

       
      </StyledRoot>
    </>
  );
}
