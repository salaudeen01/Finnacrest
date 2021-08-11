import React, { Component } from "react";
import StatCards2 from "../../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat, setLastUrl} from '../../../../config/config'
import {authHeader} from '../../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../../redux/actions/user.actions";
import CustomCarousel from "../../investments/components/CustomCarousel";
import {Link} from 'react-router-dom';
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
    fetch(getConfig('getTotalBalanceShareholdings'), requestOptions)
    .then(async response => {
    const dat = await response.json();
    if (!response.ok) {
        const error = (dat && dat.message) || response.statusText;
        return Promise.reject(error);
    }
    if(dat.success == false){
      this.setState({balance: 0})
    }else{
      this.setState({balance: dat})  
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
        <div className="pb-7 pt-7 px-8 " style={{background:"green"}}>      
          <Grid container spacing={3} className="mb-3">
                
              <Grid item xs={12} md={6}>
                  <Card className="play-card p-sm-24" style={{backgroundColor:"#1999ff",height:171}} elevation={6}>
                      <div className="flex items-cente p-3">
                      <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
                      <div className="ml-3">
                          <Typography className="text-white" variant="text-16">Shareholdings</Typography>
                          <h6 className="m-0 mt-1 text-white text-22"> {numberFormat(balance)} </h6>
                      </div>
                      </div>
                  </Card>
              </Grid>
              <Grid item lg={6} md={6} xs={12} sm={12}>
                      <div className="flex items-cente">
                    <CustomCarousel />
                </div>
              </Grid>           
          </Grid>
        </div>
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
