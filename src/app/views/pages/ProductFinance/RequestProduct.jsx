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
import RequestTable from "./components/RequestTable";
import RequestSummary from "./components/RequestSummary";

class RequestProduct extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    setLastUrl()
    this.state = {
      loading:false,
      products:[],
      count:[],
      totalbalance:0,
      quantity:[]
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
  fetch(getConfig('userRequest'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
    console.log(response)
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  if(data.success == false){
    this.setState({ products: []});
  }else{
    this.setState({products: data, loading:false });
  }  
})
.catch(error => {
  if (error === "Unauthorized") {
        this.props.logout()
     }
  this.setState({loading:false, err : "internet error" });
  console.error('There was an error!', error);
});
    
    fetch(getConfig('getAllDebitCards'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false || data.length == 0 ){
      this.setState({cards: []});
    }else{
      this.setState({cards: data});  
    }
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.timeOut()
      }
  });
}



render(){
 const {loading, products, count, totalbalance, handleDelete, cart_quantity} = this.state
  return (
    <div className="m-sm-30">
        <AppBar color="default" style={{position: "relative"}} className="mb-sm-30">
        <Toolbar>
        <div style={{marginLeft: "theme.spacing(2)", flex: 1, color:"white"}}>
          <Breadcrumb
            routeSegments={[
              { name: "Requested Product" }
            ]}
          /> 
          {/* <Typography className="mb-sm-20 pb-3" variant='h4'>Requested Product</Typography>                */}
        </div>
        <Button style={{float:'right',color:'black'}}>
                   {/* <ShoppingCartIcon/> ({count}) */}
        </Button>
        </Toolbar>
        </AppBar>
            <Grid container spacing={2}>
                {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                <Link to="/halal">
                <Button variant="outlined" color='secondary' startIcon={<ArrowBack/>}>
                Back Shopping
                </Button> 
                </Link>
                </Grid>                 */}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <RequestTable products={products} loading={loading} cart_quantity={cart_quantity} incrementItem={this.incrementItem} DecrementItem={this.DecrementItem}/>
                </Grid>
                {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                    <RequestSummary count={count} total={totalbalance}/>
                </Grid> */}
            </Grid>
      </div>
  );
}
}

const actionCreators = {
  timeOut: userActions.timeOut,
  logout: userActions.logout,
  deleteFromCart: userActions.deleteFromCart,
  updateRequest: userActions.updateRequest,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(RequestProduct))
);