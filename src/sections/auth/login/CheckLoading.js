import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';



export default function CircularIntegration() {
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState('idle');
  const timerRef = React.useRef();

  

  // const handleClickLoading = () => {
  //   setLoading((prevLoading) => !prevLoading);
  //   timerRef.current = window.setTimeout(() => {
  //       setLoading(false);
  //     }, 3000);
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ height: 40 ,marginTop:20 }}>
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? '500ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress 
           size={40}
           placeholder='Please Wait'
           sx={{
             marginBottom:10,
             color: 'green',
             position: 'absolute',
             zIndex: 1,
           }}
          />
        </Fade>
      </Box>
      {/* <Button onClick={handleClickLoading} sx={{ m: 2 }}>
        {loading ? 'Please wait' : 'Login'}
      </Button> */}
    </Box>
  );
}