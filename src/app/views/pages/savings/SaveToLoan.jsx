import React from "react";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, numberFormat, payID, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, Switch, IconButton, TextField, MenuItem,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  CircularProgress,
  Checkbox,
  Slide} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import TableCard from "./components/TableCard";
import CloseIcon from "@material-ui/icons/Close";
import swal from 'sweetalert'
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import dateFormat from "dateformat"
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class SaveToLoan extends Component{
  constructor(props){
    super(props)
    setLastUrl()
        let email =  localStorage.getItem('email');
        var currentDate = new Date();
        let month = currentDate.getMonth() + 1
        let date = currentDate.getFullYear() +'-'+month+'-'+ currentDate.getDate();
      this.state={
        data: {
          amount: 0,
          frequency: '',
          transaction_time: '',
          transaction_day: 'null',
          transaction_month: '0',
          start_date: '',
          payment_method: 'Debit Card',
          card_id:""
        },
        add_card:{
          amount: 100,
          date_time: date,
          payment_method: "Debit Card",
          save_card:true,
          paystack_id: "",
          card_id:"0"
      },
        edit_data: {
          id:"",
          amount: 0,
          frequency: '',
          transaction_time: '',
          transaction_day: 'null',
          transaction_month: '0',
          start_date: '',
          payment_method: 'Debit Card',
      },
        fund_data:{
          amount: "",
          date_time: date,
          payment_method: "",
          save_card:true,
          paystack_id: "",
          card_id:"0"
      },
          key: payID(),
          email:email,
          savings: [],
          details: [],
          cards:[],
          balance: 0.00,
          other_balance: 0.00,
          tdetails: [],
          loading: true, 
          cancreate: true, 
          autoSave: false,
          pagination:[],
          err:"",
          auto_save: "",
          show:false,
          showSave:false,
          showEdit:false,
          showSaveCard:false,
          id:true
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleChangeFund = this.handleChangeFund.bind(this);
        this.handleAutoSave = this.handleAutoSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleStopPlan = this.handleStopPlan.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleQuickSave = this.handleQuickSave.bind(this);
        this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFund = this.handleSubmitFund.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
        this.handleSaveCard = this.handleSaveCard.bind(this);
        this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
        
  }
componentDidMount(){
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
  fetch(getConfig('fetchAllSaveToLoan'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({loading:false, tdetails:[], savings:[], balance:0, other_balance:0})
    }else{
      if(data[0].length == 0){
        this.setState({loading:false, savings:[], tdetails:data[3], balance:data[2], other_balance:data[1]})
      }else{
        this.setState({loading:false, edit_data:data[0][0],  savings:data[0][0], tdetails:data[3], balance:data[2], other_balance:data[1]})
      }
    }
  })
  .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
    this.setState({loading:false})
  });
}
callback = (response) => {
  const {fund_data, add_card} = this.state
  if (fund_data.amount ) {
    this.setState({fund_data:{...fund_data, paystack_id: response.reference }})
    swal("Loading...", {
      buttons: false
    })
  }else {
    this.setState({add_card:{...add_card, paystack_id: response.reference }, showSaveCard:false})
    swal("Saving Card...", {
      buttons: false
    })
  }
}
componentDidUpdate(){
  const { fund_data, add_card, data } = this.state;
  if (fund_data.paystack_id !== "") {
    this.props.addFundSaveToLoanSavings(fund_data);
    this.setState({fund_data:{...fund_data, paystack_id:""}})
  }
  if (add_card.paystack_id !== "") {
    this.props.saveWallet(add_card);
    this.setState({add_card:{...add_card, paystack_id:""}, id:false})
  }
  if(localStorage.getItem("card_id")){
    this.setState({data:{...data, card_id: localStorage.getItem("card_id") }})
    console.log(localStorage.getItem("card_id"))
    localStorage.removeItem("card_id")
  }
}
close = () => {
console.log("Payment closed");
}
handleAutoSave = event => {
  if(event.target.checked == false){
    this.setState({autoSave: event.target.checked});
    this.props.deactivateAutoSaveLoan()
  }else{
    this.setState({show:true });
  }
}
handleQuickSave = event => {
    this.setState({showSave: true});
}
handleCloseQuickSave() {
  this.setState({showSave:false});
}
handleEdit = (id) => {
  const {edit_data} = this.state
  this.setState({showEdit: true, edit_data:{...edit_data, id:id}});
}
handleStopPlan = (event, id) => {
  this.props.exitLoanSavings(id)
}
handleCloseEdit() {
this.setState({showEdit:false});
}
handleSaveCard = event => {
  this.setState({showSaveCard: true});
}

handleCloseSaveCard() {
  this.setState({showSaveCard:false});
}

handleChangeAddCard = event => {
  const {fund_data} = this.state
  const {name, value, checked} = event.target
  if(name == "save_card"){
    this.setState({fund_data:{...fund_data, [name]:checked}})
  }else{
    this.setState({fund_data:{...fund_data, [name]:value}})
  }
};
handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  if (data.amount && data.frequency && data.start_date && data.payment_method && data.card_id) {
    this.props.createSaveToLoanSavings(data);
  }else{
      swal(
        `${"check box to add new card "}`
      );
  }
}
handleSubmitFund(event) {
  event.preventDefault();
  const { fund_data } = this.state;
  if (fund_data.amount && fund_data.card_id != "") {
      this.props.addFundSaveToLoanSavings(fund_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
handleSubmitEdit(event) {
  event.preventDefault();
  const { edit_data } = this.state;
  if (edit_data.amount && edit_data.frequency && edit_data.start_date && edit_data.payment_method) {
      this.props.editSaveToLoanSavings(edit_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
handleChange = event => {
  const {data} = this.state
  const {name, value, checked} = event.target
  if(name == "id"){
    this.setState({id:checked})
  }else{
  this.setState({data:{...data, [name]:value}})
  }
};
handleChangeEdit = event => {
  const {edit_data} = this.state
  const {name, value} = event.target
  this.setState({edit_data:{...edit_data, [name]:value}})
};
handleChangeFund = event => {
  const {fund_data} = this.state
  const {name, value, checked} = event.target
  if(name == "save_card"){
    this.setState({fund_data:{...fund_data, [name]:checked}})
  }else{
    this.setState({fund_data:{...fund_data, [name]:value}})
  }
  
};
handleClose() {
  this.setState({show:false});
}
  render(){
    let obj = {
      array: []
      };
      for (var l=0;l<31;l++){
          obj.array[l] = l+1;
      }
    let {theme} = this.props
    const {balance, tdetails, loading, cards, id, auto_save, email, add_card, showSaveCard, bank_details, other_balance, fund_data, edit_data, autoSave, showSave, showEdit, data, show, savings} = this.state
    return (
      <div className="m-sm-30">
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        {/* <div className="pb-5 pt-7 px-8 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#2295f2", borderBottomRightRadius:20,
             borderTopLeftRadius:20}}>
          <Grid container spacing={8}>
              <Grid item lg={9} md={9} sm={12} xs={12}>
                <StatCards2 other_title={"Loan Investment Balance"} title={"Save To Loan Balance"} 
                color={"#2295f2"} icon={"account_balance_wallet"} amount={numberFormat(balance)} 
                investment_amount={numberFormat(other_balance)}/>
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Button className="uppercase"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#2295f2", color:"#fff", borderBottomRightRadius:10, borderTopLeftRadius:10,}}
                  onClick={this.handleQuickSave}>
                   Quick Save
                </Button>
              </Grid>
          </Grid>
          <Grid container spacing={8}>
              <Grid item lg={8} md={8} sm={4} xs={4}>
                {balance != 0 &&<Button className="uppercase"
                  size="small"
                  style={{borderBottomRightRadius:10, borderTopLeftRadius:10,}}
                  variant="outlined"
                  onClick={()=>this.handleStopPlan(savings.id)}>
                    {this.props.savings?"Loading...":"Stop Plan"}
                </Button>}
              </Grid>
          </Grid>
        </div>
         */}
        <div className="py-3" />
        <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <h4 className="card-title text-muted mb-4">Latest Transactions</h4>
                <TableCard transactions={tdetails}/>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                  <h4 className="card-title text-muted mb-4">My Account Details</h4>
                <Card elevation={3} className="pt-5 px-5 mb-6">
                <Grid container spacing={3}>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                      <Typography variant="h6">
                        {savings.auto_status? "Turn OFF Auto save": "Turn ON Auto save"}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Switch
                        checked={savings.auto_status? true:false}
                        onChange={this.handleAutoSave}
                        value="checked"
                        color="secondary"
                      />
                      {this.props.savings && (
                        <CircularProgress
                          size={24}
                      />)}
                    </Grid>
                    {savings.auto_status?
                    <>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        Amount
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        {savings.amount}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        Frequency
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        {savings.frequency}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        Start Date
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        {dateFormat(savings.start_date, "mmmm dS, yyyy")}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        Payment Method
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography variant="subtitle1">
                        {savings.payment_method}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Button onClick={()=>this.handleEdit(savings.id)} contained style={{color:"#fff", backgroundColor:"#0d60d8"}}>Edit Auto save </Button>
                    </Grid>
                    </>:
                    <div></div>
                  }
                  </Grid>
                </Card>
              </Grid>
        </Grid>
        </>}
        {/* Quick Save Dialog Start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={showSave}
          scroll="body"
          onClose={this.handleCloseQuickSave}>
          <AppBar style={{position: "relative",}} color='primary'>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseQuickSave}
                aria-label="Close">
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"fff"}}>
                Fund Your Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitFund}
              onError={errors => null}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Enter Amount"
                    onChange={this.handleChangeFund}
                    type="number"
                    name="amount"
                    value={fund_data.amount}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    className="mb-4 w-full"
                    select
                    label="Select Payment Method"
                    value={fund_data.payment_method}
                    name="payment_method"
                    onChange={this.handleChangeFund}
                    helperText="Please select Payment Method"
                  >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"Wallet"}> Wallet</MenuItem>
                    <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
                </TextField>
                {this.props.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                {(fund_data.payment_method == "Wallet" || (fund_data.card_id !="0" && fund_data.card_id !="")) && 
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#2295f2", color:"#fff"}}>
                  Add Fund
                </Button>}
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Card className="px-6 pt-2 pb-4">
                    <Typography variant="h6" gutterBottom>
                      {numberFormat(fund_data.amount)}
                    </Typography>
                  </Card>
                  <Card className="px-6 pt-2 pb-4">
                    <Typography variant="h6" gutterBottom>
                      {fund_data.payment_method}
                    </Typography>
                  </Card>
                </Grid>
                {fund_data.payment_method == "Debit Card" &&
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography>Choose Card</Typography>
                  <PayCard cards={cards} value={fund_data.card_id} open={(e)=>this.setState({ fund_data:{...fund_data, card_id:""}})} handleChange={this.handleChangeFund}/>
                </Grid>}
                {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" &&
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Checkbox
                        name="save_card"
                        checked={fund_data.save_card}
                        onChange={this.handleChangeFund}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    /><Typography variant="caption">Would you like to save your card</Typography>
                </Grid>}
                {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" && 
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <PayOption callback={this.callback} amount={fund_data.amount}/>
                </Grid>}
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        {/* Quick Save Dialog End */}

        {/* Create Dialog start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={show}
          scroll="body"
          onClose={this.handleClose}>
          <AppBar style={{position: "relative",}} color='primary'>
            <Toolbar>
              <IconButton
                edge="start"
                color="primary"
                onClick={this.handleClose}
                aria-label="Close">
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
                Create Auto Save Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmit}
                  onError={errors => null}
                >
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
                  select
                  label="Select Frequency"
                  value={data.frequency}
                  name="frequency"
                  onChange={this.handleChange}
                  helperText="Please select frequency"
                >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}> Weekly</MenuItem>
                    <MenuItem value={"Monthly"}> Monthly </MenuItem>
                </TextField>
                {data.frequency === 'Monthly' && 
                <TextField
                  className="mb-4 w-full"
                  select
                  label="Select Transaction Month"
                  value={data.transaction_month}
                  name="transaction_month"
                  onChange={this.handleChange}
                  helperText="Please select Month"
                >
                  {obj.array.map((item) =>
                    <MenuItem value={item}key={item}>{item}</MenuItem>
                  )}
                </TextField>
                }
                {data.frequency === 'Weekly' && 
                <TextField
                  className="mb-4 w-full"
                  select
                  label=" Day of the Week"
                  value={data.transaction_day}
                  name="transaction_day"
                  onChange={this.handleChange}
                  helperText="Please select Day"
                >
                    <MenuItem value={"1"}>Monday</MenuItem>
                    <MenuItem value={"2"}>Tuesday</MenuItem>
                    <MenuItem value={"3"}>Wednesday</MenuItem>
                    <MenuItem value={"4"}>Thursday</MenuItem>
                    <MenuItem value={"5"}>Friday</MenuItem>
                    <MenuItem value={"6"}>Saturday</MenuItem>
                    <MenuItem value={"7"}>Sunday</MenuItem>
                </TextField>
                }
                <TextValidator
                  className="mb-4 w-full"
                  onChange={this.handleChange}
                  type="time"
                  name="transaction_time"
                  value={data.transaction_time}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-4 w-full"
                  onChange={this.handleChange}
                  type="date"
                  name="start_date"
                  value={data.start_date}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
                {/* <TextField
                  className="mb-4 w-full"
                  id="standard-select-currency"
                  select
                  label="Select Payment Method"
                  value={data.payment_method}
                  name="payment_method"
                  onChange={this.handleChange}
                  helperText="Please select Payment Method">
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"Wallet"}> Wallet</MenuItem>
                    <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
                </TextField> */}
                {this.props.savings && data.card_id &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                  style={{backgroundColor:"#2295f2", color:"#fff"}}>Create Auto Save</Button>
                  </ValidatorForm>
              </Grid>
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} id={id} value={data.card_id} open={this.handleSaveCard} handleChange={this.handleChange}/>
            </Grid>
          </Card>
        </Dialog>
        {/* Create dialog end */}
        
        {/* Edit Dialog start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        open={showEdit}
        onClose={this.handleCloseEdit}
      >
        <AppBar style={{position: "relative",}} color='primary'>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={this.handleCloseEdit}
              aria-label="Close"
            >
              <CloseIcon style={{color:'#fff'}}/>
            </IconButton>
            <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Edit Auto Save Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
        
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmitEdit}
                onError={errors => null}
              >
              <TextValidator
                className="mb-4 w-full"
                label="Enter Amount"
                onChange={this.handleChangeEdit}
                type="number"
                name="amount"
                value={edit_data.amount}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextField
               className="mb-4 w-full"
                select
                label="Select Frequency"
                value={edit_data.frequency}
                name="frequency"
                onChange={this.handleChangeEdit}
                helperText="Please select frequency"
              >
                  <MenuItem value={"Daily"}>Daily</MenuItem>
                  <MenuItem value={"Weekly"}> Weekly</MenuItem>
                  <MenuItem value={"Monthly"}> Monthly </MenuItem>
              </TextField>
              {edit_data.frequency === 'Monthly' && 
              <TextField
                className="mb-4 w-full"
                select
                label="Select Transaction Month"
                value={edit_data.transaction_month}
                name="transaction_month"
                onChange={this.handleChangeEdit}
                helperText="Please select Month"
              >
                {obj.array.map((item) =>
                  <MenuItem value={item}key={item}>{item}</MenuItem>
                )}
              </TextField>
              }
              {edit_data.frequency === 'Weekly' && 
              <TextField
                className="mb-4 w-full"
                select
                label=" Day of the Week"
                value={edit_data.transaction_day}
                name="transaction_day"
                onChange={this.handleChangeEdit}
                helperText="Please select Day"
              >
                  <MenuItem value={"1"}>Monday</MenuItem>
                  <MenuItem value={"2"}>Tuesday</MenuItem>
                  <MenuItem value={"3"}>Wednesday</MenuItem>
                  <MenuItem value={"4"}>Thursday</MenuItem>
                  <MenuItem value={"5"}>Friday</MenuItem>
                  <MenuItem value={"6"}>Saturday</MenuItem>
                  <MenuItem value={"7"}>Sunday</MenuItem>
              </TextField>
              }
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChangeEdit}
                type="time"
                name="transaction_time"
                value={edit_data.transaction_time}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChangeEdit}
                type="date"
                name="start_date"
                value={edit_data.start_date}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              {/* <TextField
               className="mb-4 w-full"
                id="standard-select-currency"
                select
                label="Select Payment Method"
                value={edit_data.payment_method}
                name="payment_method"
                onChange={this.handleChangeEdit}
                helperText="Please select Payment Method"
              >
                  <MenuItem value={""}></MenuItem>
                  <MenuItem value={"Wallet"}> Wallet</MenuItem>
                  <MenuItem value={"Debit Card"}> Debit Card </MenuItem>
              </TextField> */}
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#2295f2", color:"#fff"}}>Edit Auto Save</Button>
                 </ValidatorForm>
            </Grid>
        </Grid>
        </Card>
      </Dialog>
        {/* Edit dialog end */}

        <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} handleChangeCard={this.handleChangeAddCard}/>
      </div>
    );
  };
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet:userActions.saveWallet,
  deactivateAutoSaveLoan: userActions.deactivateAutoSaveLoan,
  createSaveToLoanSavings: userActions.createSaveToLoanSavings,
  addFundSaveToLoanSavings:userActions.addFundSaveToLoanSavings,
  exitLoanSavings: userActions.exitLoanSavings,
  editSaveToLoanSavings: userActions.editSaveToLoanSavings
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(SaveToLoan))
);
