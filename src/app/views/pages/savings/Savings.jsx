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
import CustomCarousel from "../investments/components/CustomCarousel";
import Loading from "matx/components/MatxLoading/MatxLoading";


class Savings extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    this.state = {
      total: 0,
      target:0,
      regular:0,
      loan:0,
      loan_investment:0,
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
    fetch(getConfig("totalFundSaveToLoanSavings"), requestOptions)
    .then(async response => {
        const loan_data = await response.json();
        if (!response.ok) {
            const error = (loan_data && loan_data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(loan_data.success == false){
          this.setState({loan_investment: 0, loan:0})  
        }else{
          this.setState({loan_investment: loan_data[0], loan:loan_data[1]})  
        }
    })
    .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
    });
    fetch(getConfig('fetchAllBalances'), requestOptions)
      .then(async response => {
      const dat = await response.json();
      if (!response.ok) {
          const error = (dat && dat.message) || response.statusText;
          return Promise.reject(error);
      }
      if(dat.success == false || dat == 0){
        this.setState({total: 0, regular: 0, target: 0, loan: 0, loading:false})
      }else{
        this.setState({total: dat[0], regular: dat[1], target: dat[2], loading:false})
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
 const {total, target, regular, loan, loan_investment, loading} = this.state
  return (
    <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Savings" }
            ]}
          />
        </div>
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <div style={{width:"100%"}}>
          <Grid container spacing={2} >
            <Grid item lg={8} md={8} xs={12} sm={12}>
              <Card elevation={8}>
                <SavingsBalanceCard title={"Total Balance"} amount={numberFormat(total)}/>
              </Card>
            </Grid>
            <Grid item lg={4} md={4} xs={12} sm={12}>
              {/* <Card> */}
                <Link><CustomCarousel 
                  title={'aadrsdjhkj'}
                /></Link>
                {/* <Link to="/savings-tab/regular"><img src="/assets/images/savings-banner.jpeg" alt="upgrade" /></Link> */}
              {/* </Card> */}
            </Grid>
          </Grid>
          <div className="py-5" />
          <Grid container spacing={3} >
            <Grid item lg={4} md={4} >
              <Link to="/savings-tab/regular">
                <CustomCard icon={"payments"} colors={"#ccf0fe"} borderColor={"#0a1f67"} textcolor={"#0d60d8"} amount={numberFormat(regular)} title={"Regular Saving"} subtitle={"Save regularly on Daily, Weekly or Monthly timeframe."} />
              </Link>
            </Grid>
            <Grid item lg={4} md={4} >
              <Link to="/savings-tab/target">
              <CustomCard icon={"track_changes"} colors={"#ffeaf5"} borderColor={"#d41be0"} textcolor={"#e74398"} amount={numberFormat(target)} title={"Target Saving"} subtitle={"Save to achieve monetary goals, with flexible timeframe."}/>
              </Link>
            </Grid>
            <Grid item lg={4} md={4} >
              <Link to="/savings-tab/savetoloan">
                <CustomCard icon={"money"} colors={"#e7f6ff"} borderColor={"#2b80e8"} textcolor={"#2295f2"} amount={numberFormat(loan)} investment_amount={numberFormat(loan_investment)} title={"Save To Loan"} subtitle={"Flexible savings to get our free interest loan"}/>
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
  withRouter(connect(mapState,  actionCreators)(Savings))
);