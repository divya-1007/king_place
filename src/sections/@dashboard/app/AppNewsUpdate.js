// @mui
import PropTypes from 'prop-types';
import { Box, Stack, Link, Card, Button, Divider, Typography, CardHeader } from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

// AppNewsUpdate.propTypes = {
//   title: PropTypes.string,
//   subheader: PropTypes.string,
//   list: PropTypes,
// };

export default function AppNewsUpdate({ title, subheader, list, ...other }) {
 function checkuser(userData){
  if(userData?.isadmin){
    return userData;
  }
 }
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list?.map((news) => (
            (<>
            {news?.isadmin == false?
            <NewsItem key={news.id} news={news} />
            :<NewsItem key={news.id} newsData={news} />}</>)
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        {/* <Button size="small" color="inherit" endIcon={<Iconify icon={'eva:arrow-ios-forward-fill'} />}>
          View all
        </Button> */}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

// NewsItem.propTypes = {
//   news: PropTypes.shape({
//     description: PropTypes.string,
//     image: PropTypes.string,
//     postedAt: PropTypes.instanceOf(Date),
//     title: PropTypes.string,
//   }),
// };

function NewsItem({ news ,newsData}) {
  return (
    <>
    {news ?
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box component="img" alt={news?.title} src={'/assets/images/covers/cover_1.jpg'} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {news?.firstName +" " +news?.lastName} 
        </Link>

        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          {news?.email}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
        {fToNow(news?.createdAt)}
      </Typography>
    </Stack>
    :
    <Stack direction="row" alignItems="center" spacing={2}>
    <Box component="img" alt={newsData?.productType} src={newsData?.product_image} sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }} />

    <Box sx={{ minWidth: 240, flexGrow: 1 }}>
      <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
        {newsData?.productName} 
      </Link>

      <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
        {newsData?.price}
      </Typography>
    </Box>

    <Typography variant="caption" sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}>
      {fToNow(newsData?.updatedAt)}
    </Typography>
  </Stack>
  }
    </>
  );
}


