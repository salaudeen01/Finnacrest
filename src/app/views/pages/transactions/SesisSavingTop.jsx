import React, { Component } from "react";
import {getConfig, payID, numberFormat, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import CustomCarousel from "../investments/components/CustomCarousel";
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
    fetch(getConfig("showWalletBalance"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          this.setState({bad_response:true, loading: false });
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ wallet_bal: data});
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
      });
      fetch(getConfig('getBank'), requestOptions)
        .then(async response => {
        const res = await response.json();
        if (!response.ok) {
          this.setState({loading: false });
          const error = (res && res.message) || response.statusText;
          return Promise.reject(error);
        }
          this.setState({bank_details: res[0]})
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
        <Grid container spacing={3} className="mb-3">
               
            <Grid item xs={12} md={6}>
                <Card className="play-card p-sm-24" style={{backgroundColor:"#1999ff",height:171}} elevation={6}>
                    <div className="flex items-cente p-3">
                    <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
                    <div className="ml-3">
                        <Typography className="text-white" variant="text-16">Wallet Balance</Typography>
                        <h6 className="m-0 mt-1 text-white text-22"> {numberFormat(wallet_bal)} </h6>
                    </div>
                    </div>
                </Card>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={12}>
                    <div className="flex items-cente">
                  <CustomCarousel />
                {/* <Link to="/savings-tab/regular"><img src="/assets/images/savings-banner.jpeg" alt="upgrade" /></Link> */}
              {/* </Card> */}
              </div>
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