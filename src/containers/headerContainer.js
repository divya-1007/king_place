import {connect} from 'react-redux';
import Haders from "src/components/header";

const mapStateToProps = state=>({
   data:state.cartItem
})

const mapDispatchProps = dispatch=>({
  
})

export default connect(mapStateToProps,mapDispatchProps)(Haders)

// export default Homes;