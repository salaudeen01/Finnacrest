import React, { Component } from "react";
import PaginationTable from "./PaginationTable";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, payID, numberFormat, setLastUrl, checkUserStatus} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Loading from "matx/components/MatxLoading/MatxLoading";
import bgimage from "../../../../assets/sesis-wallet.jpg"

import {
  Icon,
  Select,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Grid, Card, Button, TextField, MenuItem, Checkbox, DialogActions, Slide
} from "@material-ui/core";
import "date-fns";
import PayOption from "app/views/dashboard/shared/PayOption";
import PayCard from "app/views/dashboard/shared/PayCard";
import swal from "sweetalert";
import ModalForm from "./ModalForm";
import { userConstants } from "app/redux/_constants";
import { Store } from "app/redux/Store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class WalletTab extends Component{
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
      pay_options:[],
      modal:false,
      modalForm:false, 
      modalFee:false,
      registrationFee: 0,
      pagination:[],
      show: false,
      show_withdraw: false,
      email:email,
      isButtonDisabled:false,
      bank_details:null
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpenWithdraw = this.handleClickOpenWithdraw.bind(this);
    this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
    this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
    this.handleConfirmWithdraw = this.handleConfirmWithdraw.bind(this);
    this.handleChangeWithdraw = this.handleChangeWithdraw.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveWallet = this.saveWallet.bind(this);
    this.handleClosePin = this.handleClosePin.bind(this);    
    this.handleOpenModalForm = this.handleOpenModalForm.bind(this);
    this.handleCloseModalForm = this.handleCloseModalForm.bind(this);
    this.handleOpenModalFee = this.handleOpenModalFee.bind(this);
    this.handleCloseModalFee = this.handleCloseModalFee.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
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
        }console.log(data)
        this.setState({ wallet: data.data, pagination: data, loading: false });
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
    });
    fetch(getConfig('payment_method'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }console.log(data.data)
    if(data.success == false){
      this.setState({pay_options: []});
    }else{
      this.setState({pay_options: data.data});  
    }
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
    });
     fetch(getConfig("getRegistrationFee"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading: false });
          return Promise.reject(error);
        }
        // console.log(data)
        this.setState({ loading: false, registrationFee:data});
      })
}

fetch_next_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.next_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    if(data.success == false){
      this.setState({wallet: [], loading:false });
    }else{
      this.setState({wallet: data.data, pagination:data, loading:false });
    }
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}      

fetch_next_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.next_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, wallet:data.data, pagination:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_prev_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.prev_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, wallet:data.data, pagination:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_page = (index)=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.path+"?page="+index, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, wallet:data.data, pagination:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

  callback = (response) => {
    const { data } = this.state;
      if (data.amount ) {
        this.setState({data:{...data, paystack_id: response.reference }})
    }
  }
  componentDidMount(){
    let check = checkUserStatus()
    if(check == false){
      this.setState({modal:true})
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
    this.setState({
      isButtonDisabled: true
    });
  };

  handleSubmitWithdraw = () => {
    const { withdrawData } = this.state;
    if(withdrawData.amount && withdrawData.password){
      this.props.verifyWithdraw(withdrawData)
      this.setState({
        isButtonDisabled: true
      });
      swal("loading...")
    }
      this.setState({show_withdraw:false});
  };

  handleConfirmWithdraw = () => {
    const { withdrawData } = this.state;
    if(withdrawData.amount && withdrawData.withdrawal_pin){
      this.props.confirmWithdraw(withdrawData)
      this.setState({
        isButtonDisabled: true
      });
      swal("loading...")
    }
  };
  handleChangeWithdraw(event) {
    const { name, value } = event.target;
    const { withdrawData } = this.state;
    this.setState({withdrawData: {...withdrawData, [name]: value }});
  }
  handleClosePin() {
    Store.dispatch({
      type:userConstants.SAVINGS_CONTINUES,
      user:false
    })
    this.setState({showPin:false});
  }
  handleCloseWithdraw() {
    this.setState({show_withdraw:false});
  }
  handleClickOpenWithdraw() {
    this.setState({show_withdraw:true});
  }

handleChange(event) {
  const { name, value, checked } = event.target;
  const { data } = this.state;
  if(name == "save_card"){
    this.setState({data:{...data, [name]:checked}})
  }else{
    this.setState({data: {...data, [name]: value }});
  }
}


handleClickOpen() {
  this.setState({show:true});
}
handleClose() {
  this.setState({show:false});
}
handleOpenModalForm = () => {
  this.setState({modalForm: true});
}
handleCloseModalForm() {
  this.setState({modalForm:false});
}
handleOpenModalFee = () => {
  this.setState({modalFee: true});
}
handleCloseModalFee() {
  this.setState({modalFee:false});
}
  render(){
    let {theme} = this.props
    const {pagination,wallet_bal,pay_options, modal, wallet, modalForm, registrationFee, modalFee,  bank_details,
           withdrawData, cards, loading, show, show_withdraw,isButtonDisabled, data, email} = this.state
    return (
      <div className="m-sm-30">
      { modal == false ?
        <div>
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
        <div className="pb-7 pt-7"
         style={{
          //  backgroundImage: `url(${bgimage})`,
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center center",
         backgroundAttachment: "fixed",}}>
        <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <StatCards2 title={"Wallet Balance"} color={"#87260e"} icon={"account_balance_wallet"} amount={numberFormat(wallet_bal)}/>
            </Grid>
        </Grid>
        <Grid container spacing={1}>              
              <Grid item lg={3} md={3} sm={12} xs={12}>
              {/* <ButtonGroup color="primary" aria-label="outlined primary button group"> */}
                <Button className="uppercase"
                  size="small"
                  variant="contained"
                  style={{backgroundColor:"green", color:"white"}}
                  onClick={this.handleClickOpen}>Add Fund
                </Button>
                {wallet_bal > 0 &&
                  <Button className="uppercase"
                    size="small"
                    variant="outlined"
                    style={{borderColor:"#0d60d8"}}
                    onClick={this.handleClickOpenWithdraw}>Withdraw
                  </Button>
                }
        {/* </ButtonGroup> */}
              </Grid>
          </Grid>
        </div>
        <div className="py-3" />
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
              <SimpleCard title="Wallet Table">
                <PaginationTable transactions={wallet} pagination={pagination}
                 fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page}
                 fetch_prev_page={this.fetch_prev_page}  loading={loading}/>
              </SimpleCard>
          </Grid>
        </Grid>
        </>
      }
      </div>:
      <></>}
      <Dialog      
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
        open={show}
        scroll="body"
        onClose={this.handleClose} >
        <AppBar style={{position: "relative", backgroundColor:'green'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon style={{color:'#fff'}}/>
            </IconButton>
            <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Wallet
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
          <ValidatorForm
            ref="form"
            // onSubmit={this.saveWallet}
            onError={errors => null}>
            <Grid container spacing={4}>
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
                <TextField
                  className="mb-4 w-full"
                  id="standard-select-currency"
                  select
                  label="Select payment method"
                  value={data.payment_method}
                  name="payment_method"
                  onChange={this.handleChange}
                  helperText="Please select Payment Method"
                >
                  <MenuItem value={""}></MenuItem>
                  {pay_options.slice(1).map((name, index) => (
                    <MenuItem value={name.name}>{name.name}</MenuItem>
                  ))}
              </TextField>
                {this.props.savings.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }              
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-2">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(data.amount)}
                  </Typography>
                </Card>
              </Grid>
              {data.payment_method == "Paystack" &&
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography>Choose Card</Typography>
                  <PayCard cards={cards} value={data.card_id} open={(e)=>this.setState({ data:{...data, card_id:""}})} handleChange={this.handleChange}/>
                </Grid>
              }
              {data.card_id == "" && data.payment_method == "Paystack"  && 
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Checkbox
                        name="save_card"
                        checked={data.save_card}
                        onChange={this.handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /><Typography variant="caption">Would you like to save your card</Typography>
                  {data.card_id == "" && data.payment_method == "Paystack"  && 
                    <PayOption callback={this.callback} amount={data.amount} type={'07'} targetId={"00"}/>
                  }
                </Grid>
              }
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {(data.card_id != "" && data.card_id !="0") && 
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  onClick={this.saveWallet}
                  disabled={isButtonDisabled}
                  variant="contained"
                  // color="primary"
                  style={{color:"#fff",background:'green'}}>
                  Add Fund
                </Button>}
              </Grid>
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
      {/* withdraw Dialog start */}
      <Dialog      
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
        open={show_withdraw}
        onClose={this.handleCloseWithdraw}>
          <AppBar style={{position: "relative", backgroundColor:'green'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseWithdraw}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
                Withdraw To Bank
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={1}>
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
                    disabled={isButtonDisabled}
                    color="primary"
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

        {/* Loan repayment Dialog Start */}
      <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={modal}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseRepayment} >
          <AppBar style={{position: "relative", backgroundColor:'green'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseRepayment}
                aria-label="Close"
              >
                {/* <CloseIcon style={{color:'#fff'}}/> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To Finnacrest
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  We have INTEREST FREE LOAN, which is easily accesseable 
                </Typography>
                <Typography>
                  To access our LOAN, Click on the <span style={{color:"green"}}>Member button</span> to continue
                </Typography>
              </Grid> <br/>
                <DialogActions>
                
                <Grid container spacing={1}>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                      
                          <Button className="uppercase"
                            size="small"
                            onClick={this.handleOpenModalForm}
                            variant="outlined">
                            Become a Member
                        </Button>                       
                      </Grid> 
                      <Grid item lg={4} md={4} sm={4} xs={12}>                 
                      {/* <Link to="/business_financing"> */}
                      <Link to="/business-fianance">
                          <Button className="uppercase"
                              size="small"
                              variant="outlined">
                                  Business Finance
                          </Button> 
                        </Link>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                  
                       <Link to="/product_financing"> <Button className="uppercase"
                            size="small"
                            variant="outlined">
                            Product Finance
                        </Button>
                      </Link>
                      </Grid>
                </Grid>
                  </DialogActions>
              </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}
        {/* Loan repayment Dialog Start */}
      <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={modalForm}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseModalForm} >
          <AppBar style={{position: "relative", backgroundColor:'green'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalForm}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To Finnacrest
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
               {loading ?
                <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
                  <Loading />
                </div>:
                <>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  The registration fee is:
                </Typography>                
                <Typography variant='h6'>
                  <b>{numberFormat(registrationFee)}</b>
                </Typography>
                
                <Typography variant='h6'>
                  Click the below button to continue with the payment 
                </Typography>
                <Button className="uppercase"
                    size="small"
                    onClick={this.handleOpenModalFee}
                    variant="outlined"> Continue
                </Button>
               </Grid>
               </>} <br/>
                </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}
        {/* Loan repayment Dialog Start */}
      <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={modalFee}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseModalFee} >
          <AppBar style={{position: "relative", backgroundColor:'green'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalFee}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To Finnacrest
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-1 pt-2 pb-4">
              <Grid item lg={12} md={12} sm={12} xs={12}>
               <ModalForm amount={registrationFee}/>
              </Grid>
                </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}



      {/* confirm withdraw Dialog start */}
      <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        open={this.props.savings.proceed}
        onClose={this.handleClosePin}>
          <AppBar style={{position: "relative", backgroundColor:'green'}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClosePin}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
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
                  // disabled={isButtonDisabled}
                  // color="primary"
                  style={{color:"#fff",background:'green'}}>
                  Withdraw
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
      {/* confirm withdraw dialog end */}
  
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
  withRouter(connect(mapState,  actionCreators)(WalletTab))
);
