import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';
import { useState, useEffect } from "react";
// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: '-1', label: 'Price: High-Low' },
  { value: '1', label: 'Price: Low-High' },
];
export const FILTER_CATEGORY_OPTIONS = ['All', 'Food', 'Room', 'wedding'];
export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25 - $75' },
  { value: 'above', label: 'Above $75' },
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter,onOpenFilter,onCloseFilter,onDataFromChild }) {
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleDataSendToParent = () => {
    onDataFromChild({selectedPrice:selectedPrice,selectedCategory:selectedCategory});
  };
  
  const handelClearData =()=>{
    setSelectedPrice('')
    setSelectedCategory('')
    onCloseFilter(false)
  }
  
  

  return (
    <>
      <Button disableRipple sx={{color:"#00000"}} endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" sx={{color:'#ffffff'}}  gutterBottom>
                Category
              </Typography>
              <RadioGroup value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel sx={{color:'#ffffff'}}  key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" sx={{color:'#ffffff'}}  gutterBottom>
                Price
              </Typography>
              <RadioGroup value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}>
                {SORT_BY_OPTIONS.map((item) => (
                  <FormControlLabel sx={{color:'#ffffff'}}  key={item.value} value={item.value} control={<Radio />} label={item.label} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" sx={{color:'#ffffff'}} gutterBottom>
                Rating
              </Typography>
              <RadioGroup>
                {FILTER_RATING_OPTIONS.map((item, index) => (
                  <FormControlLabel 
                    key={item}
                    value={item}
                    control={
                      <Radio
                        disableRipple
                        color="default"
                        icon={<Rating readOnly value={4 - index} />}
                        checkedIcon={<Rating readOnly value={4 - index} />}
                        sx={{
                          '&:hover': { bgcolor: 'transparent' },
                        }}
                      />
                    }
                    label="& Up"
                    sx={{
                      my: 0.5,
                      borderRadius: 1,
                      color:'#ffffff',
                      '&:hover': { opacity: 0.48 },
                    }}
                  />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
        <Button sx={{color:'#000000',mb:5}}
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-filter-list" />}
            onClick={handleDataSendToParent}
            >
            Apply 
          </Button>
          <Button sx={{color:'#000000'}}
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handelClearData}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
