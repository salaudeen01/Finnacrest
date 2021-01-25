import React, { Component, Fragment } from "react";
import DoughnutChart from "../charts/echarts/Doughnut";
import { authHeader } from "../../redux/logic";
import StatCards from "./shared/StatCards";
import TableCard from "./shared/TableCard";
import RowCards from "./shared/RowCards";
import { Link, withRouter } from "react-router-dom";
import UpgradeCard from "./shared/UpgradeCard";
import { withStyles } from "@material-ui/styles";
import { payID, getConfig, setLastUrl, numberFormat, checkUserStatus } from '../../config/config'
import swal from 'sweetalert'
import { userActions } from "../../redux/actions/user.actions";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
import PayOption from "./shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import PayCard from "./shared/PayCard";
import AddCardDialog from "./shared/AddCardDialog";
import ModalForm from "../pages/transactions/ModalForm";
import ShareholdingFee from "../pages/Shareholdings/ShareholdingFee";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class Dashboard1 extends Component {
  constructor(props){
    setLastUrl();
    super(props)
    let email =  localStorage.getItem('email');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = { 
                data: {
                  id:"",
                  acct_type:"",
                  amount: "",
                  date_time: entry_date,
                  payment_method: "",
                  target_name:"",
                  paystack_id: "",
                  card_id:"0",
                  save_card:true,
                },
                add_card:{
                  amount: 100,
                  date_time: entry_date,
                  payment_method: "Debit Account",
                  save_card:true,
                  paystack_id: "",
                  card_id:""
              },
                key: payID(),
                opened :false, 
                back:false, 
                loading: true,
                profile:[],
                bank:[],
                cards:[],
                wallet_balance:"" ,
                regular_balance:"",
                market_balance: "",
                halal_balance: "",
                loan_balance:"",
                share_balance:"",
                loan_investment:"",
                target_balance:"",
                loan_avail_amount:"",
                transactions:[],
                shareMinFee:"",
                error: "",
                show:false,
                continued: false,
                email: email,
                accounts:[],
                showSaveCard:false,
                modal:false,
                modalForm:false, 
                modalFee:false,
                shareFee:false,
                registrationFee: 0,
                } ;
            this.handleSaveCard = this.handleSaveCard.bind(this);
            this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
            this.handleClose = this.handleClose.bind(this);
            this.handleClickOpen = this.handleClickOpen.bind(this);
            this.handleShareOpen = this.handleShareOpen.bind(this);
            this.handleShareClose = this.handleShareClose.bind(this);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleOpenModalForm = this.handleOpenModalForm.bind(this);
            this.handleCloseModalForm = this.handleCloseModalForm.bind(this);
            this.handleOpenModalFee = this.handleOpenModalFee.bind(this);
            this.handleCloseModalFee = this.handleCloseModalFee.bind(this);
}

callback = (response) => {
  const { data, key, add_card } = this.state;
  
  if (data.acct_type && data.amount) {
    this.setState({data:{...data, paystack_id: response.reference }})
    swal("Loading...", {
      buttons: false
    })   
  }else{
    this.setState({add_card:{...add_card, paystack_id: response.reference }, showSaveCard:false})
    swal("Saving Card...", {
      buttons: false
    })
  }
}
componentDidUpdate(){
  const { data, add_card } = this.state;
  if (data.paystack_id !== "") {
    if(data.acct_type == "Wallet"){
      this.props.saveWallet(data)
    }else if(data.acct_type == "Regular Savings"){
        this.props.addFundRegularSavings(data);
    }else if(data.acct_type == "Save To Loan"){
        this.props.addFundSaveToLoanSavings(data)
    }else{
        this.props.addFundTargetSavings(data);
    }
    this.setState({data:{...data, paystack_id:""}})
  }
  if (add_card.paystack_id !== "") {
    this.props.saveWallet(add_card);
    this.setState({add_card:{...add_card, paystack_id:""}})
  }
}
close = () => {
console.log("Payment closed");
}

handleSaveCard = event => {
  this.setState({showSaveCard: true});
}

handleCloseSaveCard() {
  this.setState({showSaveCard:false});
}

handleSubmit(acct_type) {
  const { data } = this.state;
  if (data.amount && data.acct_type) {
    if(acct_type == "Wallet"){
        this.props.saveWallet(data)
    }else if(acct_type == "Regular Savings"){
        this.props.addFundRegularSavings(data);
    }else if(acct_type == "Save To Loan"){
        this.props.addFundSaveToLoanSavings(data)
    }else{
        this.props.addFundTargetSavings(data);
    }
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}

handleChange(event) {
const { name, value, checked } = event.target;
const { data, accounts } = this.state;
if(name == "target_name"){
    accounts.forEach(dat => {
      if(dat.target_name == value){
        this.setState({data:{...data, id:dat.id, [name]:dat.target_name}})
      }
    });
}else if(name == "acct_type" && value == "Wallet"){
  this.setState({ data: { ...data, [name]: value, "payment_method": "Debit Card" }});
}else if(name == "save_card"){
    this.setState({ data:{...data, [name]:checked}})
}else{
  this.setState({ data: { ...data, [name]: value }});
  }
}
handleClickOpen() {
  this.setState({show:true});
}
handleClose() {
  this.setState({show:false});
}
handleShareOpen() {
  this.setState({shareFee:true});
}
handleShareClose() {
  this.setState({shareFee:false});
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
componentDidMount(){
let check = checkUserStatus()
  if(check == false){
    this.setState({modal:true})
  }
const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
};
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
fetch(getConfig("showProfile"), requestOptions)
.then(async response => {
    const profile = await response.json();
    if (!response.ok) {
        const error = (profile && profile.message) || response.statusText;
        return Promise.reject(error);
    }
    if(profile.length == 0){
      this.setState({profile: []})
    }else{
      this.setState({profile: profile[0]})
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig('getBank'), requestOptions).then(async res=>{
  const dat = await res.json();
  if (!res.ok) {
    const error = (dat && dat.message) || res.statusText;
    return Promise.reject(error);
  }
  if(dat.length == false || dat.length == 0){
    this.setState({bank: []})
  }else{
    this.setState({bank: dat[0]})
  }
}).catch(err=>{
  if (err === "Unauthorized") {
    this.props.timeOut()
  }
})
fetch(getConfig("showWalletBalance"), requestOptions)
.then(async response => {
    const wal_data = await response.json();
    if (!response.ok) {
        const error = (wal_data && wal_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    this.setState({wallet_balance: wal_data})
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
        this.setState({accounts:[]})  
      }else{
        this.setState({accounts:data[1]}) 
      }
    })
    .catch(error => {
        if (error === "Unauthorized") {
          this.props.timeOut()
          }
    });
fetch(getConfig("shareholdingMinFee"), requestOptions)
.then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({shareMinFee: 0})  
    }else{
      this.setState({shareMinFee: data})  
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("getTotalBalanceShareholdings"), requestOptions)
.then(async response => {
    const shareholding = await response.json();
    if (!response.ok) {
        const error = (shareholding && shareholding.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(shareholding.success == false){
      this.setState({share_balance: 0, loan_investment: 0})  
    }else{
      this.setState({share_balance: shareholding, loan_investment: shareholding[0]})  
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("totalTargetFund"), requestOptions)
.then(async response => {
    const target_balance = await response.json();
    if (!response.ok) {
        const error = (target_balance && target_balance.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(target_balance.success == false){
      this.setState({target_balance: 0}) 
    }else{
      this.setState({target_balance: target_balance}) 
    }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("getTotalMarketFund"), requestOptions)
.then(async (response) => {
    const market_data = await response.json();
    if (!response.ok) {
    const error = (market_data && market_data.message) || response.statusText;
    this.setState({loading: false });
    return Promise.reject(error);
    }
    if(market_data.success == false){
      this.setState({ market_balance: 0});
    }else{
      this.setState({ market_balance: market_data});
    }
    
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("getTotalHalalFund"), requestOptions)
.then(async (response) => {
        const halal_data = await response.json();
        if (!response.ok) {
        const error = (halal_data && halal_data.message) || response.statusText;
        this.setState({loading: false });
        return Promise.reject(error);
        }
        if(halal_data.success == false){
          this.setState({ halal_balance: 0});
        }else{
          this.setState({ halal_balance: halal_data});
        }
})
.catch((error) => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("showTransaction"), requestOptions)
.then(async (response) => {
            const data = await response.json();
            if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            this.setState({loading: false });
            return Promise.reject(error);
            }
            if(data.success == false){
              this.setState({ transactions: []});
            }else{
              this.setState({ transactions: data.data});
            }
})
.catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut()
        }
});
fetch(getConfig("totalFundRegularSavings"), requestOptions)
.then(async response => {
    const reg_data = await response.json();
    if (!response.ok) {
        const error = (reg_data && reg_data.message) || response.statusText;
        this.setState({loading:false})
        return Promise.reject(error);
    }
    if(reg_data.success == false){
      this.setState({regular_balance: 0, loading:false})
    }else{
      this.setState({regular_balance: reg_data, loading:false})
    }
})
.catch(error => {
    if (error === "Unauthorized") {
        this.props.timeOut()
      }
      this.setState({loading:false});
    
});
fetch(getConfig('owner_savings_balance'), requestOptions)
.then(async response => {
const data = await response.json();
if (!response.ok) {
  console.log(response)
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
}
if(data.success == false  || data.length == 0 ){
  this.setState({ loan_avail_amount: 0});
}else{
  this.setState({loan_avail_amount: data, loading:false });
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

  render() {
    let { theme } = this.props;
    const {error, accounts, show, wallet_balance, add_card, showSaveCard, cards, bank, profile, data, email, 
      loading, shareFee, transactions, target_balance, continued, regular_balance, market_balance, share_balance, 
      loan_investment,shareMinFee, loan_avail_amount, halal_balance, modal, modalForm, registrationFee, modalFee} = this.state
    return (
      <div >
        { modal == false ?
        loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <Fragment>
        <div className="pb-24 pt-2 px-8 bg-default">
        </div>
        <div className="analytics pt-3 m-sm-30 mt--14">
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <StatCards
                  shareMinFee={shareMinFee}
                  share={share_balance}
                  wallet_balance={numberFormat(wallet_balance)} 
                  halal_balance={numberFormat(halal_balance)}
                  market_balance={numberFormat(market_balance)}
                  regular_balance={numberFormat(regular_balance)}
                  target_balance={numberFormat(target_balance)}
                  loan_avail_amount={numberFormat(loan_avail_amount)}
                  share_balance={numberFormat(share_balance)}
                  loan_investment={numberFormat(loan_investment)}
                  openModal={this.handleClickOpen}
                  shareModal={this.handleShareOpen}/>
                  {/* <ScrollCards /> */}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {(wallet_balance == 0 || bank.length == 0  || profile.relationship == "" || profile.length == 0 ) && <h4 className="card-title text-muted mb-4">Todo List</h4>}
              <RowCards wallet={wallet_balance} bank={bank} profile={profile}/>
              <Card className="px-6 py-4 pt-4 mb-6">
                <div className="card-title">My Savings Account </div>
                {(regular_balance+target_balance+share_balance != 0)?
                <DoughnutChart
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]}
                  name1={"Regular Savings"}
                  name2={"Target Savings"}
                  name3={"Shareholding"}
                  regular_value={regular_balance} 
                  target_value={target_balance} 
                  loan_value={share_balance}
                />:
                <img src="/assets/images/illustrations/empty_pie.png" />}
              </Card>
              {/* <Card className="px-6 py-4 pt-4 mb-6">
                <div className="card-title">My Investments Account </div>
                {halal_balance + market_balance != 0?
                <DoughnutChart
                  height="300px"
                  color={[
                    theme.palette.primary.dark,
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]}
                  name1={"Halal Investment"}
                  name2={"Market Investment"}
                  regular_value={halal_balance} 
                  target_value={market_balance} 
                  loan_value={0}
                />:
                <img src="/assets/images/illustrations/empty_pie.png" />
              }
              </Card> */}
            </Grid>
           
            <Grid item lg={6} md={6} sm={12} xs={12}>
              {/* <UpgradeCard /> */}
              <h4 className="card-title text-muted mb-4">Latest Transactions</h4>
              <TableCard transactions={transactions}/>
              {/* <Campaigns /> */}
            </Grid>
          </Grid>
        </div>
      
      <Dialog
      TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        scroll="body"
        open={show}
        onClose={this.handleClose} >
        <AppBar style={{position: "relative", }} color='primary'>
          <Toolbar>
            <IconButton
              edge="start"
              color="white"
              className="text-white"
              onClick={this.handleClose}
              aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography className="text-white" variant="h6" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Your Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm
          ref="form"
          onSubmit={()=>this.handleSubmit(data.acct_type)}
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
               <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Package"
                value={data.acct_type}
                name="acct_type"
                onChange={this.handleChange}
                helperText="Please select a Package"
              >
                <MenuItem value={"Regular Savings"}> Regular Savings</MenuItem>
                {/* <MenuItem value={"Save To Loan"}> Shareholding</MenuItem> */}
                <MenuItem value={"Target Savings"}> Target Savings</MenuItem>
                <MenuItem value={"Wallet"}> Wallet </MenuItem>
              </TextField>
              {data.acct_type == "Target Savings" &&
              <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Target Plan"
                value={data.target_name}
                name="target_name"
                onChange={this.handleChange}
                helperText="Please select a Target Plan"
              >
                <MenuItem value={""}> </MenuItem>
                {accounts.map((data, index)=>(
                  <MenuItem key={index} value={data.target_name}> {data.target_name} </MenuItem>
                ))}
              </TextField>}
              {data.acct_type != "Wallet" &&
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
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Debit Card"}> Debit Card</MenuItem>
              </TextField>}
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="px-6 pt-2 pb-4">
                <Typography variant="h6" gutterBottom>
                  {numberFormat(data.amount)}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {data.acct_type}
                </Typography>
              </Card>
            </Grid>
            {data.payment_method == "Debit Card" &&
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} value={data.card_id} open={(e)=>this.setState({ data:{...data, card_id:""}})} handleChange={this.handleChange}/>
            </Grid>}
            {data.card_id == "" && data.payment_method == "Debit Card"  && 
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Checkbox
                    name="save_card"
                    checked={data.save_card}
                    onChange={this.handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                /><Typography variant="caption">Would you like to save your card</Typography>
            </Grid>}
            {data.card_id == "" && data.payment_method == "Debit Card"  && 
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <PayOption callback={this.callback} amount={data.amount}/>
            </Grid>}
          </Grid>
          {this.props.savings &&
            <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          }
          {(data.payment_method == "Wallet" || (data.card_id !="0" && data.card_id !="")) &&
          <Button color="primary" className="text-white" variant="contained" type="submit">
            {/* <Icon>send</Icon> */}
            <span className="pl-2 capitalize">Fund Account</span>
          </Button>}
        </ValidatorForm>
        </Card>
      </Dialog>
             
      <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} />
    </Fragment>:
        <></>}

         {/* Loan repayment Dialog Start */}
         <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={modal}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseRepayment} >
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseRepayment}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>
                  We have INTEREST FREE LOAN which easily accesseable 
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
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalForm}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4 text-center">
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
              </Grid> <br/>
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
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalFee}
                aria-label="Close"
              >
                {/* <CloseIcon /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
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
        {/* Loan repayment Dialog Start */}
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={shareFee}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleShareClose} >
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="white"
                className="text-white"
                onClick={this.handleShareClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white text-center" style={{ flex: 1, color:"#fff"}}>
                    Shareholding Funding
              </Typography>
            </Toolbar>
          </AppBar> 
          <Card className="px-1 pt-2 pb-4">
            <Grid item lg={12} md={12} sm={12} xs={12}>                      
              <Typography variant="h6" className="text-primary text-center" style={{ flex: 1,}}>
                  A minimum of {numberFormat(shareMinFee)} is required in your Shareholding before you can Fund other Accounts 
                </Typography>             
               <ShareholdingFee />
              </Grid>
            </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}
  </div>
    );
  }
}

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  saveWallet: userActions.saveWallet,
  addFundRegularSavings: userActions.addFundRegularSavings,
  addFundTargetSavings: userActions.addFundTargetSavings,
  addFundSaveToLoanSavings: userActions.addFundSaveToLoanSavings,
  timeOut: userActions.timeOut,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Dashboard1))
);