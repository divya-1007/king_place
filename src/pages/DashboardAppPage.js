import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState,useEffect } from "react";
// @mui
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { GetRequest } from "../apicall/index";


// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [items, setItems] = useState([]);
  const [tokens, setTokens] = useState('');
  const [product, setProduct] = useState([]);
  
  // const [latestUser, setLatestUser] = useState(product?.latestUser);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    localStorage.setItem('token', JSON.stringify(token));
    if(token){
    setTokens(token)
    }else{
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify(items));
    if (items) {
    setItems(items);
    }else if (!items) {
      window.location.href = "/";
    }
  }, []);

    
  const getProduct = async (token) => {
    await GetRequest(`api/product/dashboard`, token)
      .then((response) => {
        if (response?.data) {
          setProduct(response?.data?.DashBoardData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    getProduct(token);
  }, []);
  
console.log(product ,"kdvcd");
  function changeUpperCase(UserName) {
    const yourString = UserName
    const firstLetterCapital = yourString.charAt(0).toUpperCase();
    const restOfStringLowercase = yourString.substring(1).toLowerCase();
    const modifiedString = firstLetterCapital + restOfStringLowercase;
    return modifiedString
    }
    console.log(product?.latestOrder ,"product?.latestOrder");

  return (
    <>
    { tokens ? (<>
      <Helmet>
        <title> Dashboard | King Palace Hotal </title>
      </Helmet>
    
      <Container maxWidth="xl" >
        <Typography variant="h4"  sx={{ mb: 5 ,color:'#ffffffe3'}}>
          Hi, Welcome
          <span style={{color:'red' ,padding:'10px',fontFamily:'Public Sans,sans-serif'}}>{changeUpperCase(items?.firstName)} {changeUpperCase(items?.lastName)}</span>
        </Typography>
        {items.isadmin === true ?
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total User" total={product?.UserCount} color="success" icon={'ant-design:usergroup-add'} />
          </Grid>
        
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Orders" total={product?.UserCount} color="info" icon={'ant-design:shopping-cart'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Items" total={product?.ProductCount} color="warning" icon={'ant-design:shop'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Wedding Items" total={product?.WeddingCount} sx={{color: '#22585f',backgroundColor:' #c2f8ff'}} icon={'emojione:wedding'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Room" total={product?.RoomCount} color="error" icon={'mdi:guest-room'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Food Items" total={product?.FoodCount} sx={{color: '#103996',backgroundColor:' #b6e2ff'}} icon={'wpf:dining-room'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Website Total User Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Total Product"
              chartData={[
                { label: 'Room', value: product?.RoomCount },
                { label: 'Wedding', value: product?.WeddingCount },
                { label: 'Food', value: product?.FoodCount },
              ]}
              chartColors={[
                theme.palette.success.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {/* <AppConversionRates sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            /> */}
            <AppNewsUpdate sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Latest User Update"
              // list={[product?.latestUser].map((_, index) => ({
              //   id: faker.datatype.uuid(),
              //   title:{firstName +" " +lastName} ,
              //   description: email,
              //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
              //   postedAt: createdAt,
              // }))}
              list={product?.latestUser}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="User Growth"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Latest Orders Update"
              // list={[...Array(5)].map((_, index) => ({
              //   id: faker.datatype.uuid(),
              //   title: faker.name.jobTitle(),
              //   description: faker.name.jobTitle(),
              //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
              //   postedAt: faker.date.recent(),
              // }))}
              list={product?.latestOrder}
              
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Orders Growth"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Latest Items Update"
              // list={product?.latestItem.map((_, index) => ({
              //   id: faker.datatype.uuid(),
              //   title: faker.name.jobTitle(),
              //   description: faker.name.jobTitle(),
              //   image: `/assets/images/covers/cover_${index + 1}.jpg`,
              //   postedAt: faker.date.recent(),
              // }))}
            list={product?.latestItem}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Items Growth"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
                { id: '6', label: 'Sprint Showcase' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid> */}
        </Grid>
        :
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary title="Total User" total={10} color="success" icon={'ant-design:usergroup-add'} />
        </Grid>
      
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary title="Total Orders" total={10} color="info" icon={'ant-design:shopping-cart'} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary title="Total Items" total={10} color="warning" icon={'ant-design:shop'} />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Website Total User Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Total Product"
              chartData={[
                { label: 'Room', value: product?.RoomCount },
                { label: 'Wedding', value: product?.WeddingCount },
                { label: 'Food', value: product?.FoodCount },
              ]}
              chartColors={[
                theme.palette.success.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
        }
      </Container>
       </>)
      :null} 
    </>
  );
}
