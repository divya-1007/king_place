 import {connect} from 'react-redux';
 import Homes from "src/components/home";
 import {addToCart ,removeToCart} from '../service/Actions/actions';

 const mapStateToProps = state=>({
    data:state.cartItem
 })

 const mapDispatchProps = dispatch=>({
    addToCartHandler:data=>dispatch(addToCart(data)),
    removeToCartHandler:data=>dispatch(removeToCart(data))

 })

export default connect(mapStateToProps,mapDispatchProps)(Homes)
 
// export default Homes;