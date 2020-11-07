import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, SimpleCard } from "matx";
import { Grid, Card, Button, Typography, IconButton,ButtonGroup, Toolbar, AppBar, Dialog, MenuItem, TextField, Slide, } 
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ProductDetails extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    setLastUrl()
    this.state = {
      cart:{
        id:id,
        price:'',
        payment_method:'',
        quantity: 1,
      },
      // quantity: 1,
      singleNews:[],
      singleInvestment:[],      
      id:id,      
      isLoading:true,
      loading:true,
      count:[],
    }
    this.addToCart = this.addToCart.bind(this);
    this.increment = this.increment.bind(this);
    this.Decrease = this.Decrease.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  

  componentDidMount(){
    const {id} = this.state
    let user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('getInvestmentNews')+ id +`?token=`+user.token, requestOptions)
          .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
          if(data.success == false){
            this.setState({singleNews: []});
          }else{
            this.setState({singleNews: data});
          }
      })
      .catch(error => {
          if (error === "Unauthorized") {
          this.props.timeOut()
          }
      });
      fetch(getConfig('getSingleHalai')+ id +`?token=`+user.token, requestOptions)
          .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
          console.log(data)
          if(data.success == false){
            this.setState({singleInvestment: [], isLoading: false})
          }else{
            this.setState({singleInvestment: data, cart:{...this.state.cart, id:data[0].id, payment_method:'payment_method', price:data[0].price}, isLoading: false})
          }
      })
      .catch(error => {
          if (error === "Unauthorized") {
          this.props.timeOut()
          }
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
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { cart } = this.state;
    
        this.setState({
            cart: {
                ...cart,
                [name]: value
            }
        });    
  }
 
  addToCart(where) {  
      const { cart } = this.state;
      console.log(cart);
      if ( cart.price && cart.id && cart.quantity) {
        this.props.addToCart(cart, where);
      }

  }
    increment() {
      let { cart, quantity, id} = this.state
      this.setState({cart:{...cart, quantity: cart.quantity+1}})     
    }
    Decrease() {
      let { cart, quantity, id} = this.state
      if(cart.quantity){      
        this.setState({cart:{...cart, quantity: cart.quantity-1}}) 
      }else{
        this.setState({cart:{...cart, quantity:cart.quantity= 1}});
    }
  }

    // IncrementItem = (index) => {
    //   let { formList} = this.state
    //   this.setState({formList:[...formList, "name"+index], index:index+1})
    // }
    // DecreaseItem = (index) => {
    //   this.state.formList.splice("name"+index,1)
    //   this.setState({formList:this.state.formList})
    // }
    // increment() {
    //   this.setState({
    //     cart: this.state.cart.quantity + 1
    //   });
    // };

render(){
 const {total, halal, singleNews, cart, count, singleInvestment, addToCart,Decrease, increment, isLoading} = this.state
  return (
    <div className="m-sm-30">        
         {/* View Dialog start */}        
            <AppBar color="default" style={{position: "relative"}}>
              <Toolbar>
                {/* <Typography variant="h6" style={{marginLeft: "theme.spacing(2)", flex: 1, color:"white"}}>
                  Product Details                  
                </Typography>  */}
                <div style={{marginLeft: "theme.spacing(2)", flex: 1, color:"white"}}>
                  <Breadcrumb
                    routeSegments={[
                      { name: "Product Details " }
                    ]}
                  />
                </div>
                <Link to="/detail/cart">
                <Button style={{float:'right',color:'black'}}>
                   <ShoppingCartIcon/> ({count})
                 </Button>
                 </Link>
              </Toolbar>
            </AppBar>
            {isLoading?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>: 
            <Card className="px-6 pt-2 pb-4"> 
              <Grid container spacing={2}>
                <Grid item lg={9} md={9} sm={12} xs={12}>
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                    <SingleInvestmentcardDetails investment={singleInvestment} cart={this.state.cart} addToCart={()=>this.addToCart(true)}
                    continueShopping={()=>this.addToCart(false)}
                    increment={this.increment} handleChange={this.handleChange} Decrease={this.Decrease}/>
                  </div>
                </Grid>
                {/* <Grid>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button>-</Button>
                            <Button>
                                {cart.quantity}
                            </Button>
                            <Button onClick={this.increment}>+</Button>
                        </ButtonGroup>
                    </Grid> */}
              </Grid>              
              <div className="py-3" />
              <Grid container spacing={2}>
                <Grid item lg={9} md={9} sm={12} xs={12}>
                  <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                    <SingleInvestmentcard investment={singleInvestment} />
                  </div>
                </Grid>
              </Grid>
            </Card>            
          }
        {/* View dialog end */}
      </div>
  );
}
}

const actionCreators = {
  timeOut: userActions.timeOut,
  addToCart: userActions.addToCart
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(ProductDetails))
);