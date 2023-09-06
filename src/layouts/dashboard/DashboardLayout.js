import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
import Header from "./header";
import Nav from "./nav";

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  backgroundColor: "#001e3c",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
   if(token){
    setToken(token)
    }else{
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
    }else if(!items){
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      {token ?(
        <>
          <StyledRoot>
            <Header onOpenNav={() => setOpen(true)} />
            <Nav userData={items} openNav={open} onCloseNav={() => setOpen(false)} />
            <Main>
              <Outlet />
            </Main>
          </StyledRoot>
        </>
         ) : null} 
    </>
  );
}
