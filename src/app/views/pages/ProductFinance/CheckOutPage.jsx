import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, SimpleCard } from "matx";
import { Grid, Card, Button, Typography, IconButton, Toolbar, AppBar, Dialog, MenuItem, TextField, } 
from '@material-ui/core';
import CustomCard from "./components/CustomCard";
import {Link} from 'react-router-dom';
import SavingsBalanceCard from "./components/SavingsBalanceCard";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import {getConfig, numberFormat, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import CustomCarousel from "./components/CustomCarousel";
import Loading from "matx/components/MatxLoading/MatxLoading";
import SingleInvestmentcard from './components/SingleInvestmentCard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SingleInvestmentcardDetails from './components/SingleInvestmentCardDetails';
import CartTable from "./components/CartTable";
import MarketCard2 from "./components/MarketCard2";
import swal from 'sweetalert'
import ArrowBack from '@material-ui/icons/ArrowBack';
import CartSummary from "./components/CartSummary";

class CheckOutPage extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    setLastUrl()
    this.state = {
      loading:true,
      products:[],
      count:[],
      totalbalance:0,
      cart_quantity:[]
    }

  }
componentDidMount(){
    const {id} = this.state
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  // console.log('data')
  fetch(getConfig('getAllProductInCart'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
    console.log(response)
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  // console.log(data.my_carts)
  this.setState({products: data.my_carts, loading:false });
  let quantity= []
  data.my_carts.forEach(dat => {
      quantity.push(dat.cart_quantity)
  })
  this.setState({cart_quantity: quantity})
  console.log(quantity)  
})
.catch(error => {
  if (error === "Unauthorized") {
        this.props.logout()
     }
  this.setState({loading:false, err : "internet error" });
  console.error('There was an error!', error);
});
fetch(getConfig("userCartCount"), requestOptions)
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({ count: []});
      }else{
        this.setState({ count: data});
      }    
      console.log(data)
    })
    .catch((error) => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
    });
    fetch(getConfig('totalCartPerUser'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
    console.log(response)
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
    }
    
    console.log(data)
    this.setState({totalbalance: data[0], loading:false });
    })  

    .catch(error => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
    this.setState({loading:false, err : "internet error" });
    console.error('There was an error!', error);
    });
}

// incrementItem() {
//   const { cart_quantity, id} = this.state 
//   this.setState({cart_quantity:{...cart_quantity}})
// }
  
render(){
 const {loading, products, count, totalbalance, handleDelete, incrementItem} = this.state
  return (
    <div className="m-sm-30">
        <AppBar color="default" style={{position: "relative"}} className="mb-sm-30">
        <Toolbar>
        <div style={{marginLeft: "theme.spacing(2)", flex: 1, color:"white"}}>
          <Breadcrumb
            routeSegments={[
              { name: "Shopping Cart" }
            ]}
          /> 
          <Typography className="mb-sm-20 pb-3" variant='h4'>Shopping Cart</Typography>               
        </div>
        <Button style={{float:'right',color:'black'}}>
                   <ShoppingCartIcon/> ({count})
        </Button>
        </Toolbar>
        </AppBar>
            <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Link to="/halal">
                <Button variant="outlined" color='secondary' startIcon={<ArrowBack/>}>
                Back Shopping
                </Button> 
                </Link>
                </Grid>                
                <Grid item lg={9} md={9} sm={12} xs={12}>
                    <CartTable products={products} loading={loading}/>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CartSummary count={count} total={totalbalance}/>
                </Grid>
            </Grid>
      </div>
  );
}
}

const actionCreators = {
  timeOut: userActions.timeOut,
  logout: userActions.logout,
  deleteFromCart: userActions.deleteFromCart,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(CheckOutPage))
);