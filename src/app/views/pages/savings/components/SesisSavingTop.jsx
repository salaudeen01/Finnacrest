import React, { Component } from "react";
import StatCards2 from "../../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat, setLastUrl} from '../../../../config/config'
import {authHeader} from '../../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Loading from "matx/components/MatxLoading/MatxLoading";
import {
  Icon,
  Select,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Grid, Card, Button, TextField, MenuItem, Checkbox
} from "@material-ui/core";
import "date-fns";
class SesisSavingTop extends Component{
  constructor(props){
    super(props)
    setLastUrl()
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {     
      key: payID(),
      savings: [],
      loading: true,
      wallet_bal: 0.00,
      balanceRegular:0.00,
      balance:0.00,
    };

    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    // let user = JSON.parse(localStorage.getItem("user"));
    fetch(getConfig("showWalletBalance"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          this.setState({bad_response:true, loading: false });
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ wallet_bal: data, loading: false});
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
      }); 
      
    fetch(getConfig('fetchAllTarget'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({tdetails: [], balance: 0, completed: [], accounts:[], loading:false })
    }else{
      this.setState({tdetails: data[1], balance: data[0], completed:data[2], accounts:data[3], loading:false })
    }
  })
  .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
      this.setState({loading:false});
  });
  fetch(getConfig('totalFundRegularSavings'), requestOptions)
      .then(async response => {
      const dat = await response.json();
      if (!response.ok) {
          const error = (dat && dat.message) || response.statusText;
          return Promise.reject(error);
      }
      if(dat.success == false){
        this.setState({balanceRegular: 0})
      }else{
        this.setState({balanceRegular: dat})  
      }
    })
      .catch(error => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
      });     
}

  callback = (response) => {
    const { data } = this.state;
      if (data.amount ) {
        this.setState({data:{...data, paystack_id: response.reference }})
    }
  } 

  render(){
    let {theme} = this.props
    const {balance,wallet_bal, balanceRegular,loading} = this.state
    return (
      <div className="">
        {/* <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Wallet" }
            ]}
          />
        </div> */}
        {/* {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <> */}
        <div className="pb-7 pt-7 px-8 " style={{background:"#222943"}}>
        {/* <Grid container>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <StatCards2 title={"Wallet Balance"} icon={"account_balance_wallet"} 
              amount={numberFormat(wallet_bal)}/>
            </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <StatCards2 title={"Regular Balance"} color={"#0d60d8"} icon={"account_balance_wallet"} 
                amount={numberFormat(balanceRegular)} />
              </Grid>
              <Grid item lg={4} md={4} sm={12} xs={12}>
                    <StatCards2 title={"Target Balance"} color={"#e74398"} icon={"account_balance_wallet"} 
                    amount={numberFormat(balance)}/>
                </Grid>
        </Grid> */}
        <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} md={4}>
                <Card className="play-card p-sm-24" style={{backgroundColor:"#224459"}} elevation={6}>
                    <div className="flex items-center p-3">
                    <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>payments</Icon>
                    <div className="ml-3">
                        <Typography className="text-white" variant="text-16">Regular Savings</Typography>
                        <h6 className="m-0 mt-1 text-white text-22">{numberFormat(balanceRegular)}</h6>
                    </div>
                    </div>
                </Card>
            </Grid>    
            <Grid item xs={12} md={4}>
                <Card className="play-card p-sm-24" style={{backgroundColor:"#224459"}} elevation={6}>
                    <div className="flex items-cente p-3">
                    <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
                    <div className="ml-3">
                        <Typography className="text-white" variant="text-16">Target Savings</Typography>
                        <h6 className="m-0 mt-1 text-white text-22"> {numberFormat(balance)} </h6>
                    </div>
                    </div>
                </Card>
            </Grid>           
        </Grid>
        </div>     
    {/* </>
  } */}
     </div>
    );
  };
}

// export default Wallet;
const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet: userActions.saveWallet,
  verifyWithdraw: userActions.verifyWithdraw,
  confirmWithdraw:userActions.confirmWithdraw
};

const mapState = (state)=> ({
  savings: state.savings

})
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(SesisSavingTop))
);
