import React from "react";
import { styled } from '@mui/material/styles';


const CartWrapper = styled('div')(({ theme }) => ({
padding:'10px',
backgroun:"#fff",
border:'2px solid #000'

}));


function Haders({cartCount}){
return(
    <div>
        <CartWrapper>
               <div>
                <span style={{color:"#fff"}}>{cartCount}</span>
               <img src="/images/logo1.png" alt="login" />
            </div>
        </CartWrapper>
    </div>
)

}
export default Haders