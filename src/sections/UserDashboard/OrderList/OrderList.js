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
  Grid,
  ButtonGroup,
  Box,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { fCurrency } from "../../../utils/formatNumber";
// sections
import { UserListHead, UserListToolbar } from './index';
// mock
// import USERLIST from '../_mock/user';
import  {Postrequest,GetRequest} from '../../../apicall/index';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: ' Product Name', alignRight: false },
  { id: 'email', label: 'Price', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'action' ,label: 'Action', alignRight: true },
  {id:'' ,alignRight:false}
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
    return filter(array, (_user) => _user.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderList() {
  const [opens, setOpens] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ordersData, setOrdersData] = useState([])
  const [singleOrder, setSingleOrder] = useState('')

  const getUsers = async (token) => { 
    const user = localStorage.getItem('user')
   
    await GetRequest('api/orders/getOrder?type='+JSON.parse(user)?._id,token)
   .then((response)=>{
    if(response?.data){
    setOrdersData(response?.data?.orderList)
    }
   }).catch((error)=>{console.log(error)})
  };


  useEffect(() => {
  const token = JSON.parse(localStorage.getItem("token"));
   getUsers(token); 
  }, []);


  const handleOpenMenu = async(productName) => {
    setOpens(true);
    setSingleOrder(productName)
  };


  const handleCloseMenu = () => {
    setOpens(false);
    setSingleOrder('')
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = ordersData.map((n) => n.firstName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log("check",selectedIndex);
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
    // console.log(event.target.value ,"chekData")
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ordersData.length) : 0;

  const filteredUsers = applySortFilter(ordersData, getComparator(order, orderBy), filterName);
  

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
        {opens == false ? 

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ordersData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>

                     {ordersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row ,index) => {
                    const { id,address,phoneNumber,country,productId, productName,quentity, productType, price, paymentId, product_image,stage,createdAt} = row;
                    
                    const selectedUser = selected.indexOf(productName) !== -1; 
                    return (
                      <TableRow hover key={row._id} tabIndex={-1} role="checkbox"  selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, productName)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={productName} src={`${product_image}`} />
                            <Typography variant="subtitle2" color="#ffffff" noWrap >
                              {productName} {productType}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left" sx={{ color:"#ffffff"}}>{price}</TableCell>


                        <TableCell align="left" sx={{ color:"#ffffff"}}>
                            {stage ? 'shipping' : 'completePayment'}
                          </TableCell>

                        <TableCell align="left" sx={{ color:"#ffffff"}}>{createdAt?.split('T')[0]}</TableCell>
                      
                        <TableCell  align="right">
                        <Button variant="contained" sx={{ mr: 2 }} onClick={()=>handleOpenMenu({id,address,phoneNumber,country,productId, productName,quentity, productType, price, paymentId, product_image,stage,createdAt})} startIcon={<Iconify icon="carbon:view-filled" />}></Button> 
                        </TableCell>
                          
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
            rowsPerPageOptions={[2 ,5, 10, 25]}
            component="div"
            count={ordersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

        </Card>
         :
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
                    src={singleOrder?.product_image}
                    alt={singleOrder?.productName}
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
                        {singleOrder?.productName} 
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
                          {singleOrder?.stage}
                        </Typography>
                        &nbsp;
                        {singleOrder?.productType && fCurrency(singleOrder?.price*singleOrder?.quentity)}
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
                      {/* {products?.productDescription} */}
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
                    onClick={handleCloseMenu}
                    >
                    Go back
                  </Button>
                 </Box>
              </Grid> 
            </Grid> 
          </Box>
        </Card>
        }
      </Container>

    </>
  );
}