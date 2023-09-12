import React from "react";
import { styled } from '@mui/material/styles';
import Haders from "./header";


const CartWrapper = styled('div')(({ theme }) => ({
padding:'10px',
backgroun:"#fff",
border:'2px solid #000'

}));


function Homes(props){
    console.warn(props ,"Homes")
return(
    <div>
        <h1>Home Component</h1>
        <CartWrapper>
              <Haders cartCount ={props.data.length}/>
            <div>
                <img src="/images/WebsiteImage.png" alt="login" />
            </div>
            <div className="text-wrapper item">
                <span>Product</span>
                <span>Price: $1000</span>
            </div>
            <div className="btn-wrapper-item">
                <button onClick={()=> props.addToCartHandler({price:1000,name:'Product'})}>Add To Cart</button>
                <button onClick={()=> props.removeToCartHandler()}>Remove To Cart</button>
            </div>
        </CartWrapper>
    </div>
)

}
export default Homes