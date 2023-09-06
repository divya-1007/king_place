import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Box,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { toast } from "react-toastify";
import { Postrequest } from "../../../apicall/index";
import { Link } from "react-router-dom";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import "./style.css";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const recaptchaRef = React.createRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard/app";
    }
  }, []);

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading((prevLoading) => !prevLoading);

    let empty = "";
    if (!email) {
      empty = "Email";
    } else if (!password) {
      empty = "Password";
    }
    if (empty) {
      toast(`Please provide a ${empty}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast-message-error",
        theme: "light",
      });
      return;
    }

    const captchaToken = await recaptchaRef.current.getValue();

    const user = {
      email,
      password,
      captchaToken,
    };
    await Postrequest("api/users/login", user)
      .then((response) => {
        if (response.status) {
          toast.success("Sucessfully login", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-sucess",
            theme: "light",
          });
          console.log(response.data.token, "check Data", response.data.data);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("user", JSON.stringify(response.data.data));
          if(response.data.data.isadmin == false){
            setTimeout(function () {
              window.location.href = "/userDashboard/app";
              localStorage.setItem("token", JSON.stringify(response.data.token));
              localStorage.setItem("user", JSON.stringify(response.data.data));
            }, 4000);
          }else if(response.data.data.isadmin == true){
            setTimeout(function () {
              window.location.href = "/dashboard/app";
              localStorage.setItem("token", JSON.stringify(response.data.token));
              localStorage.setItem("user", JSON.stringify(response.data.data));
            }, 4000);
          }
         
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log(error?.response?.data, "aya");
        if (error?.response?.data?.status == 409) {
          toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-error",
            theme: "light",
          });
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else {
          toast.error(`${error?.response?.data?.message}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast-message-error",
            theme: "light",
          });
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email"
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
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

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2}}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        <Link variant="subtitle2" to={"/forget"} style={{color:'#fff'}} >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
      >
        {loading ? (
          <Box sx={{ height: 40 }}>
            <Typography sx={{ padding: 1 }}>Please Wait........</Typography>
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
          "Login"
        )}
      </LoadingButton>
    </>
  );
}
