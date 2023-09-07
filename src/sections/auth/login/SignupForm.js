import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox ,Box,Typography,FormControlLabel} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';
// components
import Iconify from '../../../components/iconify';
import { toast } from "react-toastify";
import  {Postrequest} from '../../../apicall/index';
import ReCAPTCHA from "react-google-recaptcha";
// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const recaptchaRef = React.createRef();
  
  const handleClick = async(e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);
    let empty = ""
    if(!firstName){
        empty = "First Name"
    }else if(!lastName){
        empty = "Last Name"
    }else if(!email){
        empty = "Email"
    }else if(!password){
        empty = "Password"
    }
    if(empty){
        toast.error(`Please provide a ${empty}`,{
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
        return
    }
    if(password !== confirmPassword){
      toast.error(`Passwords do not match`,{
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
    }

    const captchaToken = await recaptchaRef.current.getValue();
    if(!captchaToken){
      toast.error(`Please check captcha`,{
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
    }

        const user = {
          firstName,
          lastName,
            email,
            password,
            captchaToken
        }
     
     await Postrequest('api/users/signup',user)
      .then((response)=>{
        console.log("check" ,response);
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
            navigate('/login', { replace: true });
          }, 2000)
          setFirstName("")
          setLastName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
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

  return (
    <>
      <Stack spacing={3}>
      <TextField name="firstName" label="First Name" onChange={(e)=> setFirstName(e.target.value)}  />
      <TextField name="lastName" label="Last Name" onChange={(e)=> setLastName(e.target.value)} />
      <TextField name="email" label="Email address" onChange={(e)=> setEmail(e.target.value)} />
      <TextField name="ConfirmPassword" label="Password" onChange={(e)=> setConfirmPassword(e.target.value)} />


        <TextField
          name="password"
          label="ConfirmPassword"
          type={showPassword ? 'text' : 'password'}
          onChange={(e)=> setPassword(e.target.value)} 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      {/* <FormControlLabel control={<Checkbox name="remember" label="Remember me" />} label="Remember me *"/> */}
      </Stack>

       <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
      <ReCAPTCHA
          size="normal"
          ref={recaptchaRef}
          sitekey="6Lfzrl8nAAAAAMBFLo0NT9gm2WQ9eWbWbXZFJUFY"
        />
      </Stack>
      

      <LoadingButton fullWidth size="large" variant="contained" onClick={handleClick}>
        
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
             </Box>: 'SignUp'}
      </LoadingButton>
      
    </>
  );
}
