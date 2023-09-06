
// ===============================================================================================
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import  {Postrequest,GetRequest} from '../apicall/index';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action' ,label: 'Action', alignRight: false },
  { id: ''  },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [opens, setOpens] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [usersData, setUsersData] = useState([])

  const [items, setItems] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleOpenMenu = (event) => {
    setOpens(true);
  };

  const handleCloseMenu = () => {
    setOpens(false);
  };

  const getUsers = async(token) => {
  await GetRequest('api/orders/getAllUser',token)
  .then((response)=>{
    // setUsersData(response.data) 
    console.log(response.data ,"check")
    // setUsersData(response.data.user)
  }).catch((error)=>{console.log(error)})
 
  }

  if(!token){
    window.location.href = "/";
  }else{
    // setItems(token) 
    // getUsers(token)
  }

  useEffect(() => {
    getUsers(token)
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  

  const isNotFound = !filteredUsers.length && !!filterName;
  

  return (
    <>
      <Helmet>
        <title> User |King Palace Hotal </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox"  selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, name)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" color="#ffffff" noWrap >
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" sx={{ color:"#ffffff"}}>{company}</TableCell>

                        <TableCell align="left" sx={{ color:"#ffffff"}}>{role}</TableCell>

                        <TableCell align="left" sx={{ color:"#ffffff"}}>{isVerified ? 'Yes' : 'No'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>
                        
                        <TableCell  align="left">
                        <Button variant="contained" sx={{ mr: 2 }} onClick={handleOpenMenu} startIcon={<Iconify icon="eva:edit-fill" />}></Button> 
                        <Button variant="contained"  sx={{ color: 'error.main',}} startIcon={<Iconify icon="eva:trash-2-outline" />}></Button> 
                        </TableCell>
                          
                        {/* <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                          
                        </TableCell> */}
                      </TableRow>
                    ); 
                  })} 
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={opens}
        anchorEl={opens}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      {/* <Popover
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Popover> */}
    </>
  );
}
// ==================================================================

import { useState, useEffect } from "react";

// @mui
import {
  Box,
  Card,
  Grid,
  Typography,
  Stack,
  Button,
  ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../utils/formatNumber";
// components
import { useNavigate, useParams } from "react-router-dom";
import { Link, RouterLink } from "react-router-dom";
import { GetRequest, Postrequest } from "../../apicall/index";
import { ProductCartWidget } from "../../sections/@dashboard/products";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "50%",
  height: "50%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function ProductCart({ ...other }) {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [displayCounter, setDisplayCounter] = useState(true);
  const [counts, setCounts] = useState([]);

  const handleIncrement = (id) => {
    let privousCount = cartData.find((i) => i._id === id);
    if (count === 0) {
    console.log(count ,privousCount);

      setCount(privousCount.count + 1);
    } else {
    console.log(count ,privousCount);

      setCount(count + 1);
    }
  };

  const handleDecrement = (id) => {
    let privousCount = cartData.find((i) => i._id === id);
    if (count === 0) {
      setCount(privousCount.count - 1);
    } else {
      if (count > 1) setCount(count - 1);
    }
  };

  function handelAddToCart(id) {
    const existingProductIndex = cartData.findIndex((item) => item._id === id);

    if (existingProductIndex !== -1) {
      const updatedCounts = [...counts];
      updatedCounts[existingProductIndex] = {
        ...updatedCounts[existingProductIndex],
        count: count,
      };
      setCounts(updatedCounts);
      // cartDataSave({
      //   count: count,
      //   productId: id,
      //   productName: updatedCounts[existingProductIndex].productName,
      // });
    } else {
      // console.log("jnvhfvvbbvdvddd");
      // let privous = cartData.find((item) => item._id === id);
      //   let updateProduct ={
      //   status: true,
      //   count: count, 
      //   product:privous?.productInfo?._id,
      //   productName:privous?.productInfo?.productName
      //   }
      //   setCounts(prevCounts => [updateProduct, ...prevCounts]);
      // cartDataSave({count:count ,productId:product?._id,productName:product?.productName})
      // let privousCount = cartData.find(i => i.product._id === id);
      // const data ={
      //   status:true,
      //   count:count,
      //   product:privousCount.product,
      // }
      // setCounts((prev)=> ([data,...prev]))
    }
  }

  const cartDataSave = async (productData) => {
    await Postrequest(`api/product/addToCart`, productData)
      .then((response) => {
        if (response?.data) {
          getProduct();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProduct = async () => {
    await GetRequest(`api/product/getAllCart`)
      .then((response) => {
        if (response?.data) {
          setCartData(response?.data?.cart);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handelProductRemove(id) {
    let privousCount = cartData.filter((item) => item.productInfo._id != id);
    if (privousCount.length == 0) {
      navigate("/", { replace: true });
    }
    setCartData(privousCount);
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Grid container spacing={1} {...other}>
      <ProductCartWidget addToCart={counts.length > 0 ? counts : cartData} />
      {cartData.map((iteam, index) => (
        <Grid key={index} item xs={12}>
          <Card>
            <Box
              sx={{
                backgroundColor: "background.paper",
                position: "relative",
                pt: 1,
                pb: { xs: 10 },
              }}
            >
              <Grid container columns={16}>
                <Grid item xs={10} md={9}>
                  <Box sx={{ padding: "3px", mt: 1 }}>
                    <img
                      src={iteam?.productInfo?.product_image}
                      alt={iteam?.productInfo?.productName}
                      width={1100}
                      height={600}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={7}>
                  <Box
                    sx={{
                      textAlign: { xs: "center", md: "left" },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ m: 3 }}>
                      <Typography
                        component="h2"
                        sx={{
                          position: "relative",
                          fontSize: { xs: 40, md: 72 },
                          letterSpacing: 1.5,
                          fontWeight: "bold",
                          lineHeight: 1.3,
                        }}
                      >
                        <Typography
                          component="span"
                          sx={{
                            fontSize: "inherit",
                            fontWeight: "inherit",
                            position: "relative",
                            color: "primary.main",
                            "& svg": {
                              position: "absolute",
                              top: -16,
                              right: -21,
                              width: { xs: 22, md: 30 },
                              height: "auto",
                            },
                          }}
                        >
                          {iteam?.productInfo?.productName}
                          <svg version="1.1" viewBox="0 0 3183 3072">
                            <g id="Layer_x0020_1">
                              <path
                                fill="#127C71"
                                d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                              />
                              <path
                                fill="#127C71"
                                d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                              />
                              <path
                                fill="#127C71"
                                d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                              />
                            </g>
                          </svg>
                        </Typography>
                        {""}
                        <br />
                      </Typography>
                    </Box>
                    <Box sx={{ mb: 4, width: { xs: "100%", md: "70%" } }}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Typography variant="subtitle1" sx={{ ml: 5, p: 1 }}>
                          <Typography
                            component="span"
                            variant="body1"
                            sx={{
                              color: "text.disabled",
                              textDecoration: "underline",
                              m: 2,
                            }}
                          >
                            {iteam?.product?.status}
                          </Typography>
                          <Button
                            sx={{
                              background: "#e1dff5d1",
                              border: "1px solid #2065d1",
                              ml: 9,
                              p: 1,
                              color: "black",
                              float: "right",
                            }}
                            onClick={() =>
                              handelProductRemove(iteam?.productInfo?._id)
                            }
                            textAlign="right"
                          >
                            Remove To Cart
                          </Button>
                          &nbsp;
                          {iteam?.productInfo?.productType &&
                            fCurrency(iteam?.productInfo?.price)}
                        </Typography>
                      </Stack>

                      <Typography
                        sx={{
                          color: "text.secondary",
                          lineHeight: 1.6,
                          ml: 7,
                          p: 1,
                        }}
                      >
                        {
                          "Grand Palace Hotel Services Banquet facilities,Bar, Computer facility,Conference and meeting facilities,Disabled room,Fitness room,Sauna,Luggage storage,More items...  They include common hotel room items such as TVs, sound systems, refrigerators, mini-bars, free Wi-Fi, coffee-makers, hairdryers and more. Amenities often include personal items like the toiletries the hotel provides. They can also include things that make a room more comfortable, such as air-conditioning"
                        }
                      </Typography>
                      <Typography sx={{ mt: 2, ml: 9 }}>
                        Quantity
                        <ButtonGroup
                          sx={{ ml: 9, background: "#e6e5f7" }}
                          size="small"
                          aria-label="small outlined button group"
                        >
                          <Button
                            sx={{ color: "#000000" }}
                            onClick={() =>
                              handleIncrement(iteam?._id)
                            }
                          >
                            +
                          </Button>
                          {displayCounter && (
                            <Button sx={{ color: "#000000" }}>
                              {count == 0 ? iteam.count : count}
                            </Button>
                          )}
                          {displayCounter && (
                            <Button
                              sx={{ color: "#000000" }}
                              onClick={() =>
                                handleDecrement(iteam?._id)
                              }
                            >
                              -
                            </Button>
                          )}
                        </ButtonGroup>
                      </Typography>
                    </Box>
                    <Button
                      sx={{
                        background: "#e1dff5d1",
                        border: "1px solid #2065d1",
                        mb: 5,
                        ml: 9,
                        mr: 9,
                        color: "black",
                      }}
                      onClick={() => handelAddToCart(iteam?._id)}
                    >
                      Add to Cart
                    </Button>
                    {token ? (
                      <Link
                        to={"/userDashboard/orderList/" + iteam?._id}
                      >
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            width: "-webkit-fill-available",
                            ml: 9,
                            mr: 9,
                            color: "black",
                          }}
                        >
                          proceed to Buy
                        </Button>
                      </Link>
                    ) : (
                      <Link to={"/login"}>
                        <Button
                          sx={{
                            background: "#e1dff5d1",
                            border: "1px solid #2065d1",
                            width: "-webkit-fill-available",
                            ml: 9,
                            mr: 9,
                            color: "black",
                          }}
                        >
                          proceed to Buy
                        </Button>
                      </Link>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}



// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useState, useEffect } from "react";

// @mui
import { Box, Card, Grid, Typography, Stack,Button ,ButtonGroup} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../utils/formatNumber";
// components
import { useNavigate, useParams } from "react-router-dom";
import { Link, RouterLink } from 'react-router-dom';
import { GetRequest,Postrequest } from "../../apicall/index";
import {
  ProductCartWidget,
} from "../../sections/@dashboard/products";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
  top: 0,
  width: "50%",
  height: "50%",
  objectFit: "cover",
  position: "absolute",
});

// ----------------------------------------------------------------------

export default function ProductCart({productCartData,...other}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [cartData ,setCartData] = useState(productCartData)
  const [displayCounter, setDisplayCounter] = useState(true);
  const [counts, setCounts] = useState([]);


  const handleIncrement = (id) => {
  let privousCount = cartData.find(i => i.product._id === id);
  if(count ===0){
    setCount(privousCount.count + 1);
  }else{
    setCount(count + 1);
  }
  
  };

  const handleDecrement = (id) => {
    let privousCount = cartData.find(i => i.product._id === id);
    if(count ===0){
      setCount(privousCount.count - 1);
    }else{
      if(count >1)setCount(count - 1);
    }
  };

  function handelAddToCart(id){
    let privousCount = cartData.find(i => i.product._id === id);
    const data ={
      status:true,
      count:count,
      product:privousCount.product,
    }
    setCounts((prev)=> ([data,...prev]))
  }

  const cartDataSave = async (productData) => {
    await Postrequest(`api/product/addToCard`,productData )
      .then((response) => {
        console.log(response ,"response");

        if (response?.data) {
          // setProduct(response?.data?.productData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handelPrivousPage(id) {
  let privousCount = cartData.filter(item => item.product._id != id);
  console.log(privousCount ,"privousCount")
  if(privousCount.length==0){
    navigate('/', { replace: true });
  }
   setCartData(privousCount);
  }

  return (
      <Grid container spacing={1} {...other}>
      <ProductCartWidget addToCart={counts.length>0 ? counts:cartData}/>
        {cartData.map((iteam,index) => (
      <Grid key={index} item xs={12}>
        <Card>
        <Box
        sx={{
          backgroundColor: "background.paper",
          position: "relative",
          pt: 1,
          pb: { xs: 10, },
        }}
      >
       
        <Grid container columns={16}>
          <Grid item xs={10} md={9}>
            <Box sx={{ padding: "3px", mt: 1 }}>
              <img
                src={iteam?.product.product_image}
                alt={iteam?.product.productName}
                width={1100}
                height={600}
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={7}>
            <Box
              sx={{
                textAlign: { xs: "center", md: "left" },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{ m: 3 }}>

                <Typography
                  component="h2"
                  sx={{
                    position: "relative",
                    fontSize: { xs: 40, md: 72 },
                    letterSpacing: 1.5,
                    fontWeight: "bold",
                    lineHeight: 1.3,
                  }}
                >

                  <Typography
                    component="span"
                    sx={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      position: "relative",
                      color: "primary.main",
                      "& svg": {
                        position: "absolute",
                        top: -16,
                        right: -21,
                        width: { xs: 22, md: 30 },
                        height: "auto",
                      },
                    }}
                  >
                    {iteam?.product?.productName}
                    <svg version="1.1" viewBox="0 0 3183 3072">
                      <g id="Layer_x0020_1">
                        <path
                          fill="#127C71"
                          d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                        />
                        <path
                          fill="#127C71"
                          d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                        />
                        <path
                          fill="#127C71"
                          d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                        />
                      </g>
                    </svg>
                  </Typography>
                  {""}
                  <br />
                </Typography>
              </Box>
              <Box sx={{ mb: 4, width: { xs: "100%", md: "70%" } }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                 >
                  <Typography variant="subtitle1" sx={{ml: 5, p: 1}}>
                    <Typography
                      component="span"
                      variant="body1"
                      sx={{
                        color: "text.disabled",
                        textDecoration: "underline",
                        m:2
                      }}
                      >
                      {iteam?.product?.status}
                    </Typography>
                   <Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1', ml: 9, p: 1 ,color:'black',float: 'right'}} onClick={()=>handelPrivousPage(iteam?.product?._id)} textAlign="right">Remove To Cart</Button>

                    &nbsp;
                    {iteam?.product?.productType && fCurrency(iteam?.product?.price)}
                  </Typography>
                </Stack>

                <Typography sx={{ color: "text.secondary", lineHeight: 1.6, ml: 7, p: 1 }}>
                  {
                    "Grand Palace Hotel Services Banquet facilities,Bar, Computer facility,Conference and meeting facilities,Disabled room,Fitness room,Sauna,Luggage storage,More items...  They include common hotel room items such as TVs, sound systems, refrigerators, mini-bars, free Wi-Fi, coffee-makers, hairdryers and more. Amenities often include personal items like the toiletries the hotel provides. They can also include things that make a room more comfortable, such as air-conditioning"
                  }
                </Typography>
                <Typography sx={{mt:2,ml:9}}>Quantity
                <ButtonGroup sx={{ ml: 9,background:'#e6e5f7'}} size="small" aria-label="small outlined button group">
                <Button sx={{color:'#000000'}} onClick={()=>handleIncrement(iteam?.product?._id)}>+</Button>
                {displayCounter && <Button sx={{color:'#000000'}}>{count==0 ? iteam.count:count}</Button>}
                {displayCounter && <Button sx={{color:'#000000'}} onClick={()=>handleDecrement(iteam?.product?._id)}>-</Button>}
              </ButtonGroup>
              </Typography>
              </Box>
              <Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',mb:5, ml: 9,mr:9,color:'black'}} onClick={()=>handelAddToCart(iteam?.product?._id)}>Add to Cart</Button>
               {token ?
              <Link to={'/userDashboard/orderList/'+iteam?.product?._id}><Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',width:'-webkit-fill-available', ml: 9,mr:9 ,color:'black',}} >proceed to Buy</Button></Link>
              :
              <Link to={'/login'}><Button sx={{background:'#e1dff5d1',border:'1px solid #2065d1',width:'-webkit-fill-available', ml: 9,mr:9 ,color:'black',}} >proceed to Buy</Button></Link>
               }
              </Box>
          </Grid>
        </Grid>
        </Box>
        </Card>
        </Grid>
        ))}
        </Grid>
  );
}
