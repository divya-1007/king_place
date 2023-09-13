import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  Grid,
  Box,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const pages = [
  { label: "Home", href: "/" },
  { label: "Room", href: "gallary" },
  { label: "Wedding", href: "wedding" },
  { label: "Food", href: "food" },
  { label: "Contact", href: "/contact" },
  { label: "Sign In", href: "/login" },
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];


const useStyles = styled(() => ({
  header: {
    backgroundColor: "#001e3c",
    paddingRight: "79px",
    paddingLeft: "118px",
    "@media (max-width: 900px)": {
      paddingLeft: 0,
    },
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    padding:'5px',
    marginLeft: "38px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  toolbarright: {
    display: "flex",
    justifyContent: "space-between",
    float: 'right'
  },
  drawerContainer: {
    padding: "20px 30px",
    backgroundColor: "#001e3c",
    color:'#fff',
  },
}));


export default function HeaderMenu() {
  const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

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
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar sx={{backgroundColor:'#001e3c'}}>
         <Grid container columns={12}>
          <Grid item xs={12} md={6} className={toolbar}>
          {femmecubatorLogo}
          </Grid>
          <Grid item xs={12} md={6} className={toolbar}>
         <div style={{textAlign:'center'}}>{getMenuButtons()}</div>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar sx={{backgroundColor:'#001e3c'}}>
        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon/>
        </IconButton>

        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div style={{backgroundColor: "#001e3c"}}>{getDrawerChoices()}</div>
        </Drawer>

        <div style={{textAlign:'center'}}>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return pages.map(({ label, href }) => {
      return (
        <Link
          {...{
            to: href,
            color: "inherit",
            style: { textDecoration: "none",fontSize: 'medium',fontWeight: 'bold',color:'#000',backgroundColor: "#001e3c"},
            key: label,
          }}
        >
          <MenuItem><Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            style:{fontSize: 'medium',fontWeight: 'bold',width:'11%',color:'#000',margin:'5px',opacity:'0.92',
            backgroundColor:'rgb(242 248 255)'},
            className: menuButton,
          }}
        >{label}</Button>
        </MenuItem>
        </Link>
      );
    });
  };

  const femmecubatorLogo = (
      <img
        src="/images/logo1.png"

        style={{marginLeft:'3rem',marginTop:'0.5rem',borderRadius:'5px',
        opacity:'0.92',
        backgroundColor:'rgb(242 248 255)'}}
      />
  );

  const getMenuButtons = () => {
    return pages.map(({ label, href }) => {
      return (
        <Link
        {...{
          to: href,
          color: "inherit",
          style: { textDecoration: "none",fontSize: 'medium',fontWeight: 'bold',color:'#000',backgroundColor: "#001e3c"},
          key: label,
        }}
      >
        <Button
        {...{
          key: label,
          color: "inherit",
          to: href,
          style:{fontSize: 'medium',fontWeight: 'bold',width:'11%',color:'#000',margin:'5px',opacity:'0.92',
          backgroundColor:'rgb(242 248 255)'},
          className: menuButton,
        }}
      >{label}</Button>
      </Link>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
     </header>
  );
}

// }

// export default HeaderMenu;
