import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {  Container, Typography } from '@mui/material';
import { Link, RouterLink } from 'react-router-dom';

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
// sections
import { SignUpForm } from '../sections/auth/login';

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

export default function SignupPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> SignUp | King Place Hotal  </title>
      </Helmet>

      <StyledRoot>
      <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{color:'#fff'}}>
            SignUp to King Place Hotal
            </Typography>
            <Typography variant="body2" sx={{ mb: 5,color:'#fff' }}>
            Already a member? Login here {''}
              <Link variant="subtitle2" to={'/Login'}>Login</Link>
            </Typography>
            <SignUpForm />
          </StyledContent>
       </Container>
       {/* Already a member? Login here */}
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome King Place Hotal
            </Typography>
            {/* <img src="/images/service.webp" alt="login" height='100%' style={{px:2}} /> */}
          </StyledSection>
        )}
       
      </StyledRoot>
    </>
  );
}
