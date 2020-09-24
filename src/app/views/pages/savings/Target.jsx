import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, numberFormat, payID, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, Switch, IconButton, TextField, MenuItem,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Checkbox,} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import swal from 'sweetalert'
import TargetTransactionCard from "./components/TargetTransactionCards";
import TableCard from "./components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";

class Target extends Component{
  constructor(props){
    super(props)
    setLastUrl()
        var currentDate = new Date();
        let month = currentDate.getMonth() + 1
        let date = currentDate.getFullYear() +'-'+month+'-'+ currentDate.getDate();
        this.state={
          data: {
            target_name: '',
            amount: 0,
            targeted_amount: 0,
            frequency: '',
            transaction_day: '0',
            transaction_time: '',
            transaction_month: '0',
            end_date: '',
            start_date: '',
            payment_method: 'Debit Card',
            card_id:""
        },
        edit_data: {
          id:"",
          target_name: '',
          amount: '',
          targeted_amount: '',
          frequency: '',
          transaction_time: '',
          transaction_day: '',
          transaction_month: '',
          end_date: '',
          start_date: '',
          payment_method: 'Debit Card',
      },
      add_card:{
        amount: 100,
        date_time: date,
        payment_method: "Debit Card",
        save_card:true,
        paystack_id: "",
        card_id:""
    },
        fund_data:{
          id:"",
          amount: 0,
          target_name:"",
          date_time: date,
          payment_method: '',
          paystack_id:"",
          save_card:true,
          card_id:"0"
      },
        savings: [],
        details: [],
        accounts: [],
        cards:[],
        singleTargetTransaction:[],
        balance: 0.00,
        tdetails: [],
        completed: [],
        loading: true,
        autoSave: false,
        pagination:[],
        err:"",
        auto_save: "",
        show:false,
        showSave:false,
        showWithdraw:false,
        showEdit:false,
        showView:false,
        tab:true,
        isLoading:true,
        showSaveCard:false,
        id:true
        }
        this.fetchSingleTargetTransaction = this.fetchSingleTargetTransaction.bind(this);
        this.fetchSingleTarget = this.fetchSingleTarget.bind(this);
        this.ongoingTab = this.ongoingTab.bind(this);
        this.completeTab = this.completeTab.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleChangeFund = this.handleChangeFund.bind(this);
        this.handleAutoSave = this.handleAutoSave.bind(this);
        this.handleTargetAutoSave = this.handleTargetAutoSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleStopPlan = this.handleStopPlan.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleQuickSave = this.handleQuickSave.bind(this);
        this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
        this.handleSaveCard = this.handleSaveCard.bind(this);
        this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
        this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
        this.handleCloseView = this.handleCloseView.bind(this);
        this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFund = this.handleSubmitFund.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
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
    this.props.addFundTargetSavings(fund_data);
    this.setState({fund_data:{...fund_data, paystack_id:""}})
  }
  if (add_card.paystack_id !== "") {
    this.props.saveWallet(add_card);
    this.setState({add_card:{...add_card, paystack_id:""}, id:false })
  }
  if(localStorage.getItem("card_id")){
    this.setState({data:{...data, card_id: localStorage.getItem("card_id") }})
    console.log(localStorage.getItem("card_id"))
    localStorage.removeItem("card_id")
  }
}
fetchSingleTargetTransaction=(id)=>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getTargetTransaction") + id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  if(data.success == false || data.total == 0){
    this.setState({singleTargetTransaction: [], pagination:[], isLoading:false});
  }else{
    this.setState({singleTargetTransaction: data.data, pagination:data, isLoading:false});
  } 
})
  .catch(error => {
      if (error === "Unauthorized") {
          this.props.timeOut()
      }
      this.setState({isLoading:false})
  });
}

fetchSingleTarget=(id)=>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("targetDetails") + id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  if(data.success == false || data.total == 0){
    this.setState({edit_data: [], isLoading:false});
  }else{
    this.setState({edit_data: data[0], isLoading:false});
  } 
})
  .catch(error => {
      if (error === "Unauthorized") {
          this.props.timeOut()
      }
      this.setState({isLoading:false})
  });
}

close = () => {
console.log("Payment closed");
}
handleAutoSave = event => {
    this.setState({show:true });
}
handleQuickSave = event => {
    this.setState({showSave: true});
}

handleSaveCard = event => {
  this.setState({showSaveCard: true});
}

handleCloseSaveCard() {
  this.setState({showSaveCard:false});
}

handleTargetAutoSave = (id, e) => {
  if(e.target.checked == false){
    swal("Are you sure you want to Deactivate auto save?", {
      buttons: {
        cancel: "Cancel",
        
        confirm: {
          text: "Confirm",
          value: "catch"}
      },
    })
    .then((value) => {
      switch (value) {
        case "catch":
        this.props.deactivateTargetAutosave(id)
          swal("Loading...", {
            buttons: false
          });
          break;
     
        default:
          swal("cancelled!");
      }
    });
  }else{
    swal("Are you sure you want to Activate auto save?", {
      buttons: {
        cancel: "Cancel",
        
        confirm: {
          text: "Confirm",
          value: "catch"}
      },
    })
    .then((value) => {
      switch (value) {
        case "catch":
        this.props.activateTargetAutosave(id)
          swal("Loading...", {
            buttons: false
          });
          break;
     
        default:
          swal("cancelled!");
      }
    });
  }
}

handleStopPlan = (id) => {
  swal("Are you sure you want to stop this plan?", {
    buttons: {
      cancel: "Cancel",
      
      confirm: {
        text: "Confirm",
        value: "catch"}
    },
  })
  .then((value) => {
    switch (value) {
      case "catch":
        this.props.exitTargetSavings(id);
        swal("Loading...", {
          buttons: false
        });
        break;
   
      default:
        swal("cancelled!");
    }
  });
}

handleView = (id) => {
  this.setState({isLoading:true})
  this.fetchSingleTargetTransaction(id)
  this.setState({showView: true});
}
handleEdit = (id) => {
  this.setState({isLoading:true})
  this.fetchSingleTarget(id)
  const {edit_data} = this.state
  this.setState({showEdit: true, edit_data:{...edit_data, id: id}});
}

// submit form handler
handleSubmitEdit(event) {
  event.preventDefault();
  const { edit_data } = this.state;
  if (edit_data.amount && edit_data.frequency && edit_data.start_date   && edit_data.end_date  && edit_data.payment_method) {
      this.props.editTargetSavings(edit_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  if (data.amount && data.frequency && data.start_date && data.payment_method && data.card_id) {
    this.props.createTargetSavings(data);
  }else{
      swal(
          `${"check box to add new card "}`
      );
  }
}
handleSubmitFund(event) {
  event.preventDefault();
  const { fund_data } = this.state;
  if (fund_data.amount && fund_data != "") {
      this.props.addFundTargetSavings(fund_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}

// data change handler
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
  const {fund_data, tdetails} = this.state
  const {name, value, checked} = event.target
  if(name == "target_name"){
    tdetails.forEach(data => {
      if(data.target_name == value){
        this.setState({fund_data:{...fund_data, id:data.id, target_name:data.target_name}})
      }
    });
  }else if(name == "save_card"){
    this.setState({fund_data:{...fund_data, [name]:checked}})
  }else{
    this.setState({fund_data:{...fund_data, [name]:value}})
  }
  
};

handleChangeAddCard = event => {
  const {fund_data} = this.state
  const {name, value, checked} = event.target
  if(name == "save_card"){
    this.setState({fund_data:{...fund_data, [name]:checked}})
  }else{
    this.setState({fund_data:{...fund_data, [name]:value}})
  }
};

// modal close handler
handleClose() {
  this.setState({show:false});
}
handleCloseEdit() {
  this.setState({showEdit:false});
}
handleCloseView() {
  this.setState({showView:false});
}
handleCloseQuickSave() {
  this.setState({showSave:false});
}
handleCloseWithdraw() {
  this.setState({showWithdraw:false});
  }
ongoingTab() {
    this.setState({tab:true});

}
completeTab(){
  this.setState({tab:false});
}
  render(){
    let obj = {
      array: []
      };
      for (var l=0;l<31;l++){
          obj.array[l] = l+1;
      }
    let {theme} = this.props
    const {balance, tdetails, loading, isLoading, tab, cards, add_card, showSaveCard, id, auto_save, edit_data, singleTargetTransaction, showEdit, showView, completed, email, bank_details, fund_data,  autoSave, accounts, showSave,showWithdraw, data, show, savings} = this.state
    return (
      <div className="m-sm-10">
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        {/* <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#e74398", borderBottomRightRadius:20,
             borderTopLeftRadius:20}}>
              <Grid container spacing={4}>
                  <Grid item lg={9} md={9} sm={12} xs={12}>
                    <StatCards2 title={"Target Balance"} color={"#e74398"} icon={"account_balance_wallet"} 
                    amount={numberFormat(balance)}/>
                  </Grid>
                  <Grid item lg={3} md={3} sm={6} xs={6}>
                    {tdetails.length != 0 && <Button className="uppercase"
                      size="small"
                      variant="contained"
                      style={{backgroundColor:"#e74398", color:"#fff", borderBottomRightRadius:10, borderTopLeftRadius:10,}}
                      onClick={this.handleQuickSave}>
                      Quick Save
                    </Button>}
                  </Grid>
              </Grid>
              <Grid container spacing={4}>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Button className="uppercase"
                      size="small"
                      variant="contained"
                      style={{ backgroundColor:"#e74398", color:"#fff", borderBottomRightRadius:10, borderTopLeftRadius:10}}
                      onClick={this.handleAutoSave}>
                        Create Target
                    </Button>
                  </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid> */}
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Button size="small"
                variant={tab? "contained" : "outlined"}
                style={{backgroundColor: tab ? "#e74398":""}}
                onClick={this.ongoingTab}
                >Ongoing</Button>
            <Button 
                size="small"
                variant={tab? "outlined" : "contained"}
                style={{backgroundColor: tab ? "":"#e74398"}}
                onClick={this.completeTab}
                >Completed</Button>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {tab &&
              <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#e74398", borderBottomRightRadius:20,
              borderTopLeftRadius:20}}>
                {tdetails.length != 0?
                tdetails.map((data, index)=>(
                  <TargetTransactionCard key={index} status={false} 
                  withdrawStatus={data.withdraw_status} amount={numberFormat(data.targeted_amount)} 
                  value={(100 * data.target_balance)/data.targeted_amount}
                  autoSave={(e)=>this.handleTargetAutoSave(data.id, e)}
                  auto_status={data.auto_status}
                  title={data.target_name}  
                  stop={()=>this.handleStopPlan(data.id)}
                  view={()=>this.handleView(data.id)}
                  edit={()=>this.handleEdit(data.id)}
                  />
                )):
                <Typography variant="body1">No Ongoing Target Savings</Typography>
              }
              </div>}
              {!tab &&
              <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#e74398", borderBottomRightRadius:20,
              borderTopLeftRadius:20}}>
                {completed.length != 0?
                completed.map((data, index)=>(
                  <TargetTransactionCard 
                  key={index} 
                  status={true} withdrawStatus={data.withdrawal_status} 
                  amount={numberFormat(data.targeted_amount)} 
                  value={(100 * data.target_balance)/data.targeted_amount} title={data.target_name} 
                  stop={()=>this.handleStopPlan(data.id)}
                  view={()=>this.handleView(data.id)}
                  edit={()=>this.handleEdit(data.id)}
                  />
                )):
                <Typography variant="body1">No Completed Target Savings</Typography>}
              </div>
            }
            
          </Grid>
              
        </Grid>
        </>}
        {/* Quick Save Dialog Start */}
        <Dialog
          open={showSave}
          onClose={this.handleCloseQuickSave}
          scroll="body">
          <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseQuickSave}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
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
                    label="Select Target Plan"
                    value={fund_data.target_name}
                    name="target_name"
                    onChange={this.handleChangeFund}
                    helperText="Please select Target Plan"
                  >
                    <MenuItem value={""}></MenuItem>
                    {tdetails.map((data, index)=>(
                    <MenuItem key={index} value={data.target_name}>{data.target_name}</MenuItem>
                    ))}
                  </TextField>
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
                  {this.props.savings.savings &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                {(fund_data.payment_method == "Wallet" || (fund_data.card_id !="0" && fund_data.card_id !="")) && 
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#e74398", color:"#fff"}}>
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
        scroll="body"
        open={show}
        onClose={this.handleClose}>
        <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"white"}}>
              Create Target Plan
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => null}>
              <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChange}
                type="text"
                name="target_name"
                value={data.target_name}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChange}
                type="number"
                name="amount"
                value={data.amount}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                value={data.targeted_amount}
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
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChange}
                type="date"
                name="end_date"
                value={data.end_date}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} id={id} value={data.card_id} open={this.handleSaveCard} handleChange={this.handleChange}/>
              {this.props.savings.savings && data.card_id &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Create Target Plan</Button>
              </ValidatorForm>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
        {/* Create dialog end */}
        
        {/* Edit Dialog start */}
        <Dialog
          scroll="body"
          open={showEdit}
          onClose={this.handleCloseEdit}>
          <AppBar style={{position: "relative", backgroundColor:"#e74398"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseEdit}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"white"}}>
                Edit Target Savings
              </Typography>
            </Toolbar>
          </AppBar> 
          <Card className="px-6 pt-2 pb-4">
          {isLoading ?
          <Typography>Loading...</Typography>:
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmitEdit}
                onError={errors => null}>
              <TextValidator
                className="mb-4 w-full"
                label="Enter Target Name"
                onChange={this.handleChangeEdit}
                type="text"
                name="target_name"
                value={edit_data.target_name}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Frequent Savings Amount"
                onChange={this.handleChangeEdit}
                type="number"
                name="amount"
                value={edit_data.amount}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChangeEdit}
                type="number"
                name="targeted_amount"
                value={edit_data.targeted_amount}
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
              <TextValidator
                className="mb-4 w-full"
                onChange={this.handleChangeEdit}
                type="date"
                name="end_date"
                value={edit_data.end_date}
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
              {this.props.savings.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#e74398", color:"white"}}>Edit Target Plan</Button>
            </ValidatorForm>
          }
        </Card>
        </Dialog>
        {/* Edit dialog end */}

        {/* View Dialog start */}
        <Dialog
          open={showView}
          onClose={this.handleCloseView}
        >
            <AppBar color="primary" style={{position: "relative", backgroundColor:"#e74398"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                  Target Savings Transactions
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                <TableCard transactions={singleTargetTransaction} />
                }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* View dialog end */}

        <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} handleChangeCard={this.handleChangeAddCard}/>
      </div>
    );
  };
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet:userActions.saveWallet,
  createTargetSavings: userActions.createTargetSavings,
  addFundTargetSavings:userActions.addFundTargetSavings,
  withdrawTargetSavings: userActions.withdrawTargetSavings,
  editTargetSavings: userActions.editTargetSavings,
  exitTargetSavings: userActions.exitTargetSavings,
  activateTargetAutosave: userActions.activateTargetAutosave,
  deactivateTargetAutosave: userActions.deactivateTargetAutosave,
};

const mapState=(state) => ({
  savings: state.savings
})
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Target))
);
