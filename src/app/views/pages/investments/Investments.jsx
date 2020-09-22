import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Breadcrumb, SimpleCard } from "matx";
import {Grid, Card, Icon, Typography } from "@material-ui/core"
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

class Investments extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    this.state = {
      total: 0.00,
      market:0.00,
      halal:0.00,
      finance:0.00,
      loading:true
    }
    this.fetchBalances = this.fetchBalances.bind(this);
  }
  
  componentDidMount(){
    this.fetchBalances();
  }
  fetchBalances=()=>{
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
    fetch(getConfig('getTotalMarketFund'), requestOptions)
      .then(async response => {
      const dat = await response.json();
      if (!response.ok) {
          const error = (dat && dat.message) || response.statusText;
          return Promise.reject(error);
      }
      if(dat.success == false){
        this.setState({market: 0})
      }else{
        this.setState({market: dat})
      }
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
      this.setState({loading:false});
    });
    fetch(getConfig('getTotalHalalFund'), requestOptions)
      .then(async response => {
      const dat = await response.json();
      if (!response.ok) {
          const error = (dat && dat.message) || response.statusText;
          return Promise.reject(error);
      }
      if(dat.success == false){
        this.setState({halal: 0, loading:false})
      }else{
        this.setState({halal: dat, loading:false})
      }
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
      this.setState({loading:false});
    });
  }

render(){
 const {total, halal, market, finance, loading} = this.state
  return (
    <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Investments" }
            ]}
          />
        </div>
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <div style={{width:"100%"}}>
          <Grid container spacing={2} >
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Card>
                <SavingsBalanceCard title={"Investments"} amount={numberFormat(market + halal)}/>
              </Card>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              {/* <Card> */}
                <Link to="/investment/market"><CustomCarousel /></Link>
              {/* </Card> */}
            </Grid>
          </Grid>
          <div className="py-5" />
          <Grid container spacing={3} >
            <Grid item lg={4} md={4} >
              <Link to="/investment/market">
                <CustomCard icon={"store"} borderColor={"#0a1f67"} colors={"#e686d6"} textcolor={"#000"} amount={numberFormat(market)} title={"Market Investments"} subtitle={"Save regularly on Daily, Weekly or Monthly timeframe."} />
              </Link>
            </Grid>
            <Grid item lg={4} md={4} >
              <Link to="/investment/halal">
              <CustomCard icon={"trending_up"} borderColor={"#0a1f67"} colors={"#b7c75e"} textcolor={"#000"} amount={numberFormat(halal)} title={"Halal Investments"} subtitle={"Save to achieve monetary goals, with flexible timeframe."}/>
              </Link>
            </Grid>
            <Grid item lg={4} md={4} >
              <Link to="/investment/finance">
                <CustomCard icon={"business_center"} borderColor={"#0a1f67"} colors={"#5ec7ad"} textcolor={"#000"} amount={numberFormat(finance)} title={"Sme Financing Investments"} subtitle={"Flexible savings to get our free interest loan"}/>
              </Link>
            </Grid>
          </Grid>
        </div>}
      </div>
  );
}
}

const actionCreators = {
  timeOut: userActions.timeOut,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Investments))
);