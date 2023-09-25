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

    
  const getProduct = async (token,items) => {
    if(items?.isadmin === true){
      await GetRequest(`api/product/dashboard?type=all`, token)
      .then((response) => {
        if (response?.data) {
          setProduct(response?.data?.DashBoardData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
    }else if(items?.isadmin === false){
      await GetRequest(`api/product/dashboard?type=${items?._id}`, token)
      .then((response) => {
        if (response?.data) {
          console.log();
          setProduct(response?.data?.DashBoardData);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
    }
   
  };
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const items = JSON.parse(localStorage.getItem('user'));
    getProduct(token ,items);
  }, []);
  
console.log(product ,"product");
  function changeUpperCase(UserName) {
    const yourString = UserName
    const firstLetterCapital = yourString.charAt(0).toUpperCase();
    const restOfStringLowercase = yourString.substring(1).toLowerCase();
    const modifiedString = firstLetterCapital + restOfStringLowercase;
    return modifiedString
    }

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
            <AppWidgetSummary title="Total Orders" total={product?.TotalOrder} color="info" icon={'ant-design:shopping-cart'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Product" total={product?.ProductCount} color="warning" icon={'ant-design:shop'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Wedding Booking Items" total={product?.WeddingCount} sx={{color: '#22585f',backgroundColor:' #c2f8ff'}} icon={'emojione:wedding'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Room Booking Items" total={product?.RoomCount} color="error" icon={'mdi:guest-room'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Food Order Items" total={product?.FoodCount} sx={{color: '#103996',backgroundColor:' #b6e2ff'}} icon={'wpf:dining-room'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Website Total User ,Product and Order"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/'+new Date().getFullYear(),
                '02/01/'+new Date().getFullYear(),
                '03/01/'+new Date().getFullYear(),
                '04/01/'+new Date().getFullYear(),
                '05/01/'+new Date().getFullYear(),
                '06/01/'+new Date().getFullYear(),
                '07/01/'+new Date().getFullYear(),
                '08/01/'+new Date().getFullYear(),
                '09/01/'+new Date().getFullYear(),
                '10/01/'+new Date().getFullYear(),
                '11/01/'+new Date().getFullYear(),
                '12/01/'+new Date().getFullYear(),
              ]}
              chartData={[
                {
                  name: 'Users',
                  type: 'column',
                  fill: 'solid',
                  data: product?.ChartUsersData,
                },
                {
                  name: 'Product',
                  type: 'area',
                  fill: 'gradient',
                  data: product?.ChartProductData,
                },
                {
                  name: 'Orders',
                  type: 'line',
                  fill: 'solid',
                  data: product?.ChartOrderData,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Total Orders Progress"
              chartData={[
                { label: 'Shipping', value: product?.OrderShipping },
                { label: 'Complete', value: product?.OrderComplete },
              ]}
              chartColors={[
                theme.palette.success.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
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
              chartLabels={['01/01/'+new Date().getFullYear(),
              '03/01/'+new Date().getFullYear(),
              '05/01/'+new Date().getFullYear(),
              '07/01/'+new Date().getFullYear(),
              '09/01/'+new Date().getFullYear(),
              '011/01/'+new Date().getFullYear(),
              ]}
              chartData={[
                { name: 'User varify', data: product?.Users2 },
                { name: 'User Not Varify', data: product?.Users1 },
              ]}
              chartColors={[...Array(6)].map(() => '#fff')}
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
              title="Latest Product Items Update"
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
            {/* <AppOrderTimeline sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
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
            /> */}
              <AppConversionRates sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Data Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'User', value: product?.UserCount },
                { label: 'Product', value: product?.ProductCount },
                { label: 'Order', value: product?.TotalOrder },
                { label: 'Room Items', value: product?.WeddingCount},
                { label: 'Food Items', value: product?.RoomCount},
                { label: 'Wedding Items', value: product?.FoodCount },
              ]}
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
          {/* <AppWidgetSummary title="Total Room Booking" total={product?.clientroom?product?.clientroom:0} color="success" icon={'ant-design:usergroup-add'} /> */}
          <AppWidgetSummary title="Total Room Booking" total={product?.clientroom ?product?.clientroom:0} color="success" icon={'ant-design:shopping-cart'} />

        </Grid>
      
        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary title="Total Food Orders" total={product?.clientfood?product?.clientfood:Number(1) } color="info" icon={'ant-design:shopping-cart'} />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <AppWidgetSummary title="Total Wedding Booking" total={product?.clientwedding?product?.clientwedding:Number(1) } color="warning" icon={'ant-design:shopping-cart'} />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Website Orders monthly"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/'+new Date().getFullYear(),
                '02/01/'+new Date().getFullYear(),
                '03/01/'+new Date().getFullYear(),
                '04/01/'+new Date().getFullYear(),
                '05/01/'+new Date().getFullYear(),
                '06/01/'+new Date().getFullYear(),
                '07/01/'+new Date().getFullYear(),
                '08/01/'+new Date().getFullYear(),
                '09/01/'+new Date().getFullYear(),
                '10/01/'+new Date().getFullYear(),
                '11/01/'+new Date().getFullYear(),
                '12/01/'+new Date().getFullYear(),
              ]}
              chartData={[
                {
                  name: 'Food Orders',
                  type: 'column',
                  fill: 'solid',
                  data: product?.monthlyFoodCounts,
                },
                {
                  name: 'Wedding Order',
                  type: 'area',
                  fill: 'gradient',
                  data: product?.monthlyWeddingCounts,
                },
                {
                  name: 'Room Orders',
                  type: 'line',
                  fill: 'solid',
                  data: product?.monthlyRoomCounts,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits sx={{backgroundColor: '#001e3c',color:'#ffffff',border: '2px solid #fff'}}
              title="Total Orders"
              chartData={[
                { label: 'Room', value: product?.clientroom?product?.clientroom :0 },
                { label: 'Wedding', value: product?.clientwedding? product?.clientwedding:0},
                { label: 'Food', value: product?.clientfood?product?.clientfood:0 },
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
