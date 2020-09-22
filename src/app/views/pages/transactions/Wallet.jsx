import React, { Component } from "react";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
import PayOption from "app/views/dashboard/shared/PayOption";
import PayCard from "app/views/dashboard/shared/PayCard";
import swal from "sweetalert";
class Wallet extends Component{
  constructor(props){
    super(props)
    setLastUrl()
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {
      data: {
        amount: "",
        date_time: entry_date,
        payment_method: "Debit Card",
        paystack_id: "",
        save_card:false,
        card_id:"0"
    },
    withdrawData:{
      password:"",
      amount:"",
      withdrawal_pin:""
    },
      key: payID(),
      savings: [],
      loading: true,
      wallet_bal: 0,
      wallet: [],
      pagination:[],
      show: false,
      show_withdraw: false,
      email:email,
      bank_details:null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickOpenWithdraw = this.handleClickOpenWithdraw.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveWallet = this.saveWallet.bind(this);
    this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
    this.handleConfirmWithdraw = this.handleConfirmWithdraw.bind(this);
    this.handleChangeWithdraw = this.handleChangeWithdraw.bind(this);
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    // let user = JSON.parse(localStorage.getItem("user"));
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
      fetch(getConfig("showWallet"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
        this.setState({ wallet: data.data, pagination: data, loading: false });
      })
      .catch((error) => {
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
  componentDidUpdate(){
    const { data } = this.state;
    if (data.paystack_id !== "") {
      this.props.saveWallet(data);
      this.setState({data:{...data, paystack_id:""}})
    }
  }
  saveWallet = () => {
    const { data } = this.state;
    this.props.saveWallet(data)
  };

  handleSubmitWithdraw = () => {
    const { withdrawData } = this.state;
    if(withdrawData.amount && withdrawData.password){
      this.props.verifyWithdraw(withdrawData)
      swal("loading...")
    }
      this.setState({show_withdraw:false});
  };

  handleConfirmWithdraw = () => {
    const { withdrawData } = this.state;
    if(withdrawData.amount && withdrawData.withdrawal_pin){
      this.props.confirmWithdraw(withdrawData)
      swal("loading...")
    }
  };

handleChange(event) {
  const { name, value, checked } = event.target;
  const { data } = this.state;
  if(name == "save_card"){
    this.setState({data:{...data, [name]:checked}})
  }else{
    this.setState({data: {...data, [name]: value }});
  }
}
handleChangeWithdraw(event) {
  const { name, value } = event.target;
  const { withdrawData } = this.state;
  this.setState({withdrawData: {...withdrawData, [name]: value }});
}

handleClickOpen() {
  this.setState({show:true});
}
handleClose() {
  this.setState({show:false});
}
handleClickOpenWithdraw() {
  this.setState({show_withdraw:true});
}

handleCloseWithdraw() {
  this.setState({show_withdraw:false});
}
handleCloseConfirmWithdraw() {
  // this.setState({show_withdraw:false});
}
  render(){
    let {theme} = this.props
    const {pagination,wallet_bal, wallet, bank_details, withdrawData, cards, loading, show, show_withdraw, data, email} = this.state
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Wallet" }
            ]}
          />
        </div>
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        <div className="pb-7 pt-7 px-8 bg-secondary">
        <Grid container spacing={3}>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <StatCards2 title={"Wallet Balance"} icon={"account_balance_wallet"} amount={numberFormat(wallet_bal)}/>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button className="uppercase"
                size="large"
                variant="contained"
                style={{backgroundColor:"#222a45", color:"white"}}  onClick={this.handleClickOpen}>Add Fund</Button>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Button className="uppercase"
                size="small"
                variant="contained"
                style={{backgroundColor:"#222a45", color:"white"}}  onClick={this.handleClickOpenWithdraw}>Withdraw</Button>
            </Grid>
        </Grid>
        </div>
        <div className="py-3" />
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
              <SimpleCard title="Wallet Table">
                <PaginationTable transactions={wallet} pagination={pagination}/>
              </SimpleCard>
          </Grid>
        </Grid>
        
      <Dialog
        open={show}
        scroll="body"
        onClose={this.handleClose} >
        <AppBar style={{position: "relative"}} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Your Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
          <ValidatorForm
            ref="form"
            onSubmit={this.saveWallet}
            onError={errors => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Enter Amount"
                  onChange={this.handleChange}
                  type="number"
                  name="amount"
                  value={data.amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
                {this.props.savings.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
              {(data.card_id != "" && data.card_id !="0") && 
              <Button className="uppercase"
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
                style={{color:"#fff"}}>
                Add Fund
              </Button>}
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-4">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(data.amount)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>Choose Card</Typography>
                <PayCard cards={cards} value={data.card_id} open={(e)=>this.setState({ data:{...data, card_id:""}})} handleChange={this.handleChange}/>
              </Grid>
              {data.card_id == "" && <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Checkbox
                      name="save_card"
                      checked={data.save_card}
                      onChange={this.handleChange}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                  /><Typography variant="caption">Would you like to save your card</Typography>
              </Grid>}
              {data.card_id == "" && <Grid item lg={12} md={12} sm={12} xs={12}>
                <PayOption callback={this.callback} amount={data.amount}/>
              </Grid>}
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
      {/* withdraw Dialog start */}
      <Dialog
        open={show_withdraw}
        onClose={this.handleCloseWithdraw}>
          <AppBar style={{position: "relative"}} color="secondary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseWithdraw}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
                Withdraw To Bank Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <Grid container lg={12} md={12} sm={12} xs={12}>
                {bank_details == null ?
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    Please Go to settings to add Bank details
                  </Typography>
                </Grid>:
                <>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Bank Name:
                  </Typography>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_details.bank_name}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Name:
                  </Typography>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_details.account_name}
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Number:
                  </Typography>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_details.account_no}
                  </Typography>
                </Grid>
                </>}
            </Grid>
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitWithdraw}
              onError={errors => null}
            >
              <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Enter Amount"
                    onChange={this.handleChangeWithdraw}
                    type="number"
                    name="amount"
                    value={withdrawData.amount}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Password"
                    onChange={this.handleChangeWithdraw}
                    type="password"
                    name="password"
                    value={withdrawData.password}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  {this.props.savings.savings &&
                  <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                  <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                    color="secondary"
                    style={{color:"#fff"}}>
                    Withdraw
                  </Button>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Card className="px-6 pt-2 pb-4">
                    <Typography variant="h6" gutterBottom>
                      {numberFormat(withdrawData.amount)}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </ValidatorForm>
        </Card>
      </Dialog>
      {/* withdraw dialog end */}

      {/* confirm withdraw Dialog start */}
      <Dialog
        open={this.props.savings.proceed}
        onClose={()=>console.log("close")}>
          <AppBar style={{position: "relative"}} color="secondary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={()=>console.log("close")}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
                Confirm Withdrawal
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleConfirmWithdraw}
            onError={errors => null}
          >
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Withdrawal Pin"
                  onChange={this.handleChangeWithdraw}
                  type="password"
                  name="withdrawal_pin"
                  value={withdrawData.withdrawal_pin}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
                {this.props.savings.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                  color="secondary"
                  style={{color:"#fff"}}>
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
      {/* confirm withdraw dialog end */}
    </>
  }
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
  withRouter(connect(mapState,  actionCreators)(Wallet))
);
