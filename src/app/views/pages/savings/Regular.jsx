import React from "react";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, numberFormat, setLastUrl, payID} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, ButtonGroup, Switch, IconButton, TextField, MenuItem,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  CircularProgress,
  Checkbox,
  Slide} from "@material-ui/core";
import { userConstants } from "app/redux/_constants";
import { Store } from "app/redux/Store";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import TableCard2 from "./components/TableCard2";
import CloseIcon from "@material-ui/icons/Close";
import swal from 'sweetalert'
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import dateFormat from "dateformat"
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import NumberFormat from "react-number-format";
import ShareholdingFee from "../Shareholdings/ShareholdingFee";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Regular extends Component{
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
        //   withdraw_data: {
        //     amount: 0,
        //     payment_method: "Wallet", 
        //     date_time: date
        // },
        withdrawData:{
          password:"",
          amount:"",
          payment_method: "Wallet", 
          date_time: date,
          withdrawal_pin:""
        },
        fund_data:{
          amount: "",
          date_time: date,
          payment_method: "",
          save_card:true,
          paystack_id: "",
          card_id:"0"
      },
      add_card:{
        amount: 100,
        date_time: date,
        payment_method: "Debit Card",
        save_card:true,
        paystack_id: "",
        card_id:""
    },
      edit_data: {
        id: "",
        amount: 0,
        frequency: '',
        transaction_time: '',
        transaction_day: 'null',
        transaction_month: '0',
        start_date: '',
        payment_method: 'Debit Card',
    },
            key: payID(),
            email:email,
            savings: [],
            cards:[],
            details: [],
            balance: "",
            tdetails: [],
            loading: true, 
            cancreate: true, 
            autoSave: false,
            pagination:[],
            shareMinFee:"",
            share_balance:"",
            err:"",
            bank_details:null,
            auto_save: "",
            shareFee:false,
            show:false,
            isButtonDisabled: false,
            show_withdraw: false,
            showSave:false,
            // showWithdraw:false,
            showEdit:false,
            showSaveCard:false,
            id:true
            
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleChangeFund = this.handleChangeFund.bind(this);
        this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
        this.handleAutoSave = this.handleAutoSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        // this.handleChangeWithdraw = this.handleChangeWithdraw.bind(this);
        // this.handleWithdraw = this.handleWithdraw.bind(this);
        // this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
        // this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
        this.handleClickOpenWithdraw = this.handleClickOpenWithdraw.bind(this);
        this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
        this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
        this.handleConfirmWithdraw = this.handleConfirmWithdraw.bind(this);
        this.handleClosePin = this.handleClosePin.bind(this);    
        this.handleChangeWithdraw = this.handleChangeWithdraw.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleQuickSave = this.handleQuickSave.bind(this);
        this.handleSaveCard = this.handleSaveCard.bind(this);
        this.handleShareOpen = this.handleShareOpen.bind(this);
        this.handleShareClose = this.handleShareClose.bind(this);
        this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
        this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFund = this.handleSubmitFund.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.fetch_next_page = this.fetch_next_page.bind(this);
        this.fetch_page = this.fetch_page.bind(this);
        this.fetch_prev_page = this.fetch_prev_page.bind(this);
  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      };
    fetch(getConfig('getRegularSavings'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({savings: []});
      }else{
        this.setState({savings: data[0], edit_data:data[0]});  
      }
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
    });
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
    fetch(getConfig('totalFundRegularSavings'), requestOptions)
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
    fetch(getConfig('getRegularSavingsDetails'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      } 
      if(data.success == false){
        this.setState({tdetails: [], pagination:[], loading:false} );
      }else{
        this.setState({tdetails: data.data, pagination:data, loading:false} );  
      }
      })
      .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
      this.setState({loading:false});
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
            this.setState({share_balance: 0})  
          }else{
            this.setState({share_balance: shareholding})  
          }
      })
      .catch((error) => {
          if (error === "Unauthorized") {
            this.props.timeOut()
          }
      });
  }

callback = (response) => {
  const {fund_data, add_card} = this.state
  if (fund_data.amount ) {
      this.setState({fund_data:{...fund_data, paystack_id: response.reference }})
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
  const { fund_data, add_card, data } = this.state;
  if (fund_data.paystack_id !== "") {
    this.props.addFundRegularSavings(fund_data);
    this.setState({fund_data:{...fund_data, paystack_id:""}})
  }
  if (add_card.paystack_id !== "" ) {
    this.props.saveWallet(add_card)
    this.setState({add_card:{...add_card, paystack_id:"" }, id:false})
  }
  if(localStorage.getItem("card_id")){
    this.setState({data:{...data, card_id: localStorage.getItem("card_id") }})
    console.log(localStorage.getItem("card_id"))
    localStorage.removeItem("card_id")
  }
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
      this.setState({tdetails: [], loading:false });
    }else{
      this.setState({tdetails: data.data, pagination:data, loading:false });
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
    this.setState({ loading: false, tdetails:data.data, pagination:data });
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
    this.setState({ loading: false, tdetails:data.data, pagination:data });
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
    this.setState({ loading: false, tdetails:data.data, pagination:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}


close = () => {
  console.log("Payment closed");
}

handleAutoSave = event => {
  if(event.target.checked == false){
    this.setState({autoSave: event.target.checked});
    this.props.deactivateAutoSave()
  }else{
    this.setState({show:true });
  }
}

handleQuickSave = event => {
  this.setState({showSave: true});
}
handleShareOpen() {
  this.setState({shareFee:true});
}
handleShareClose() {
  this.setState({shareFee:false});
}
handleSaveCard = event => {
  this.setState({showSaveCard: true});
}

handleCloseSaveCard() {
  this.setState({showSaveCard:false});
}

handleCloseQuickSave() {
  this.setState({showSave:false});
}
// handleWithdraw = event => {
//   this.setState({showWithdraw: true});
// }
// handleCloseWithdraw() {
// this.setState({showWithdraw:false});
// }
// handleSubmitWithdraw(event) {
//   event.preventDefault();
//   const { withdraw_data } = this.state;
//   if (withdraw_data.amount ) {
//       this.props.withdrawRegularSavings(withdraw_data);
//   }else{
//       swal(
//           `${"All fields are required"}`
//       );
//   }
// }
// handleChangeWithdraw = event => {
//   const {withdraw_data} = this.state
//   const {name, value} = event.target
//   this.setState({withdraw_data:{...withdraw_data, [name]:value}})
// };

handleSubmitWithdraw = () => {
  const { withdrawData } = this.state;
  if(withdrawData.amount && withdrawData.password){
    this.props.verifyRegularWithdraw(withdrawData)
    this.setState({isButtonDisabled:true});
    swal("loading...")
  }
    this.setState({show_withdraw:false});
};

handleConfirmWithdraw = () => {
  const { withdrawData } = this.state;
  if(withdrawData.amount && withdrawData.withdrawal_pin && withdrawData.payment_method && withdrawData.date_time){
    this.props.withdrawRegularSavings(withdrawData)
    this.setState({isButtonDisabled:true});
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
handleEdit = (id) => {
  const {edit_data} = this.state
  this.setState({showEdit: true, edit_data:{...edit_data, id:id}});
}
handleCloseEdit() {
  this.setState({showEdit:false});
  }
handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  if (data.amount && data.frequency && data.start_date && data.payment_method && data.card_id) {
    this.props.createRegularSavings(data);
  }else{
      swal(
        `${"check box to add new card "}`
      );
  }
}
handleSubmitEdit(event) {
  event.preventDefault();
  const { edit_data } = this.state;
  if (edit_data.amount && edit_data.frequency && edit_data.start_date && edit_data.payment_method) {
    this.props.editRegularSavings(edit_data);
  }else{
      swal(
          `${"All field are required "}`
      );
  }
}
handleSubmitFund(event) {
  event.preventDefault();
  const { fund_data } = this.state;
  if (fund_data.amount && fund_data.card_id != "") {
    this.setState({
      isButtonDisabled: true
    });
      this.props.addFundRegularSavings(fund_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }  
}
handleChangeEdit = event => {
  const {edit_data} = this.state
  const {name, value,checked} = event.target
  if(name == "id"){
    this.setState({id:checked})
  }else if(name == "amount"){
    this.setState({edit_data:{...edit_data, [name]:value.replace(/,/g, '')}})
    }else{
  this.setState({edit_data:{...edit_data, [name]:value}})
  }
};
handleChange = event => {
  const {data} = this.state
  const {name, value, checked} = event.target
  if(name == "id"){
    this.setState({id:checked})
  }else if(name == "amount"){
    this.setState({data:{...data, [name]:value.replace(/,/g, '')}})
    }else{
  this.setState({data:{...data, [name]:value}})
  }
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

handleChangeAddCard = event => {
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
    const {balance, tdetails, share_balance, shareFee, shareMinFee, loading, cards, auto_save, id, add_card, 
            showSaveCard, email, bank_details, edit_data, showEdit, fund_data, withdraw_data, autoSave, showSave,
            showWithdraw, data, show, savings,withdrawData,show_withdraw,isButtonDisabled} = this.state
    return (
      <div className="m-sm-30">
       {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
          <Grid container spacing={1}>              
              <Grid item lg={3} md={3} sm={12} xs={12}>
              { share_balance < shareMinFee ?
                  <Button className="uppercase"
                  size="small"
                  variant="contained"
                  style={{backgroundColor:"#222943", color:"white"}}
                  onClick={this.handleShareOpen}>
                  Quick Save
                </Button>
                :<ButtonGroup color="primary" aria-label="outlined primary button group">
                  <Button className="uppercase"
                    size="small"
                    variant="contained"
                    style={{backgroundColor:"#222943", color:"white"}}
                    onClick={this.handleQuickSave}>
                    Quick Save
                  </Button>
                  <Button className="uppercase"
                    size="small"
                    variant="outlined"
                    style={{borderColor:"#222943"}}
                    // onClick={this.handleWithdraw}
                    onClick={this.handleClickOpenWithdraw}
                    >
                      Withdraw
                  </Button>
            </ButtonGroup>}
              </Grid>
          </Grid>
        
        <div className="py-3" />
        <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <h4 className="card-title text-muted mb-4">Latest Transactions</h4>
                <TableCard2 transactions={tdetails}
                // fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page}
                // fetch_prev_page={this.fetch_prev_page}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                  <h4 className="card-title text-muted mb-4">Auto Save Details</h4>
                <Card elevation={3} className="pt-5 px-5 mb-6">
                <Grid container spacing={3}>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                      <Typography variant="h6">
                        {savings.auto_status? "Disable Auto save": "Enable Auto save"}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Switch
                        checked={savings.auto_status? true:false}
                        onChange={this.handleAutoSave}
                        value="checked"
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
                        {numberFormat (savings.amount)}
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
                      <Button onClick={()=>this.handleEdit(savings.id)} contained style={{color:"#fff", backgroundColor:"#222943"}}>Edit</Button>
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
          onClose={this.handleCloseQuickSave}
          scroll="body">
        <AppBar style={{position: "relative",}} color='primary'>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleCloseQuickSave}
              aria-label="Close"
            >
              <CloseIcon style={{color:'#fff'}}/>
            </IconButton>
            <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1}}>
              Fund Your Account
            </Typography>
          </Toolbar>
        </AppBar>
        <Card className="px-6 pt-2 pb-4">
          <ValidatorForm
            ref="form"
            // onSubmit={this.handleSubmitFund}
            onError={errors => null}>
            <Grid container spacing={4}>
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
                {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" &&
                  <PayOption callback={this.callback} amount={fund_data.amount} type={'01'} targetId={"00"} />
                }
              </Grid>}
              {/* <Grid item lg={12} md={12} sm={12} xs={12}> */}
              <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
                {this.props.savings && (
                  <img
                    img
                    alt=''
                    src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                  />
                )}  
              </div>      
            {/* </Grid> */}
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {(fund_data.payment_method == "Wallet" || (fund_data.card_id !="0" && fund_data.card_id !="")) && 
                <Button className="uppercase"
                  type="submit"
                  size="large"
                  onClick={this.handleSubmitFund}
                  disabled={isButtonDisabled}
                  variant="contained"
                  style={{backgroundColor:"#222943", color:"#fff"}}>
                  Add Fund
                </Button>}
              </Grid>
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
        {/* Quick Save Dialog End */}

        {/* Edit Dialog start */}

        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" 
          open={showEdit}
          onClose={this.handleCloseEdit}
          scroll="body">
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
                Auto Save Details
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
              {/* <TextValidator
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
              /> */}
                <NumberFormat
                  value={edit_data.amount}
                  thousandSeparator={true} 
                  label="Enter Amount"
                  name="amount"
                  className="mb-4 w-full"
                  onChange={this.handleChangeEdit}
                  customInput={TextValidator}
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
                helperText="Please select Transaction Time"
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
                helperText="Please select Start Date"
                value={edit_data.start_date}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} id={id} value={edit_data.card_id} open={this.handleSaveCard} handleChangeEdit={this.handleChangeEdit}/>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
                  {this.props.savings &&
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }  
                  </div>      
              </Grid>
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#222943", color:"#fff"}}>Save Changes</Button>
                  </ValidatorForm>
            </Grid>
          </Grid>
          </Card>
          </Dialog>
        {/* Edit dialog end */}

        {/* Create Dialog start */}
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description" 
        open={show}
        onClose={this.handleClose}
        scroll="body">
        <AppBar style={{position: "relative",}} color='primary'>
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={this.handleClose}
              aria-label="Close"
            >
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
              {/* <TextValidator
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
              /> */}
               <NumberFormat
                  value={data.amount}
                  thousandSeparator={true} 
                  label="Enter Amount"
                  name="amount"
                  className="mb-4 w-full"
                  onChange={this.handleChange}
                  customInput={TextValidator}
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
                helperText="Please select Transaction Time"
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
                helperText="Please select Start Date"
                value={data.start_date}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <Typography>Choose Card</Typography>
              <PayCard cards={cards} id={id} value={data.card_id} open={this.handleSaveCard} handleChange={this.handleChange}/>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
                  {this.props.savings &&
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }  
                  </div>      
              </Grid>
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#222943", color:"#fff"}}>Create Auto Save</Button>
                 </ValidatorForm>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
        {/* Create dialog end */}
        
        {/* withdraw Dialog start */}
        {/* <Dialog         
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={showWithdraw}
          onClose={this.handleCloseWithdraw}
        >
                <AppBar style={{position: "relative",}} color='primary'>
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
                      Withdraw To Wallet
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Card className="px-6 pt-2 pb-4" style={{width:580}}>
                <ValidatorForm
                  ref="form"
                  onSubmit={this.handleSubmitWithdraw}
                  onError={errors => null}
                >
                  <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <TextValidator
                        className="mb-4 w-full"
                        label="Enter Amount"
                        onChange={this.handleChangeWithdraw}
                        type="number"
                        name="amount"
                        value={withdraw_data.amount}
                        validators={[
                          "required"
                        ]}
                        errorMessages={["this field is required"]}
                      />
                      {this.props.savings &&
                        <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                      <Button className="uppercase"
                        type="submit"
                        size="large"
                        variant="contained"
                        style={{backgroundColor:"#222943", color:"#fff"}}>
                        Withdraw Fund
                      </Button>
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12}>
                      <Card className="px-6 pt-2 pb-4">
                        <Typography variant="h6" gutterBottom>
                          {numberFormat(withdraw_data.amount)}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </ValidatorForm>
                </Card>
              </Dialog> */}
        {/* withdraw dialog end */}
      {/* withdraw Dialog start */}
          <Dialog      
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
            open={show_withdraw}
            onClose={this.handleCloseWithdraw}>
              <AppBar style={{position: "relative"}} color="primary">
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
                    Withdraw
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
                      {this.props.savings &&
                      <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      }
                      <Button className="uppercase"
                        type="submit"
                        size="large"
                        disabled={isButtonDisabled}
                        variant="contained"
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
      {/* confirm withdraw Dialog start */}
        <Dialog
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          open={this.props.proceed}
          // onClose={this.handleClosePin}
          >
            <AppBar style={{position: "relative"}} color="primary">
              <Toolbar>
                {/* <IconButton
                  edge="start"
                  color="inherit"
                  // onClick={this.handleClosePin}
                  aria-label="Close"
                >
                  <CloseIcon style={{color:'#fff'}}/>
                </IconButton> */}
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
                  {this.props.savings &&
                  <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  }
                  <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                    color="primary"
                    // disabled={isButtonDisabled}
                    style={{color:"#fff"}}>
                    Withdraw
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
      {/* confirm withdraw dialog end */}
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

        <AddCardDialog callback={this.callback} showSave={showSaveCard} handleClose={this.handleCloseSaveCard} add_card={add_card} />
      </div>
    );
  };
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  saveWallet:userActions.saveWallet,
  deactivateAutoSave: userActions.deactivateAutoSave,
  createRegularSavings: userActions.createRegularSavings,
  addFundRegularSavings:userActions.addFundRegularSavings,
  verifyRegularWithdraw: userActions.verifyRegularWithdraw,
  withdrawRegularSavings: userActions.withdrawRegularSavings,
  editRegularSavings:userActions.editRegularSavings
};

function mapState(state) {
  const {savings,proceed} = state.savings
  return {savings,proceed}
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Regular))
);
