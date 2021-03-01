import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {
  getConfig,
  numberFormat,
  setLastUrl,
  payID,
  checkUserStatus
} from "../../../config/config";
import { authHeader } from "../../../redux/logic";
import history from "../../../../history";
import CustomCarousel2 from "../investments/components/CustomCarousel2";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  Grid,
  Card,
  Button,
  Switch,
  IconButton,
  TextField,
  MenuItem,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  CircularProgress,
  Slide,
  Checkbox,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import TableCard from "./components/TableCard";
import CloseIcon from "@material-ui/icons/Close";
import swal from "sweetalert";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import bgimage from "../../../../assets/sesis8.jpeg"
import dateFormat from "dateformat";
import PayCard from "app/views/dashboard/shared/PayCard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Shareholdings extends Component {
  constructor(props) {
    super(props);
    setLastUrl();
    let email = localStorage.getItem("email");
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let date =
      currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();
    this.state = {
      data: {
        amount: 0,
        frequency: "",
        transaction_time: "",
        transaction_day: "null",
        transaction_month: "0",
        start_date: "",
        payment_method: "",
      },
      withdraw_data: {
        amount: 0,
        payment_method: "",
        date_time: date,
      },
      fund_data: {
        amount: "",
        date_time: date,
        payment_method: "",
        paystack_id: "",
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
        frequency: "",
        transaction_time: "",
        transaction_day: "null",
        transaction_month: "0",
        start_date: "",
        payment_method: "",
      },
      key: payID(),
      email: email,
      savings: [],
      details: [],
      balance: 0.0,
      tdetails: [],
      loading: true,
      cancreate: true,
      autoSave: false,
      pagination: [],
      modal:false,
      err: "",
      auto_save: "",
      show: false,
      showSave: false,
      showWithdraw: false,
      showEdit: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeEdit = this.handleChangeEdit.bind(this);
    this.handleChangeWithdraw = this.handleChangeWithdraw.bind(this);
    this.handleChangeFund = this.handleChangeFund.bind(this);
    this.handleAutoSave = this.handleAutoSave.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
    this.handleCloseEdit = this.handleCloseEdit.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitFund = this.handleSubmitFund.bind(this);
    this.handleSubmitWithdraw = this.handleSubmitWithdraw.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    let user = JSON.parse(localStorage.getItem("user"));
    var id = '';
    
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
    fetch(getConfig('getTransactionsShareholdings'), requestOptions)
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
      this.props.addFundShareholdings(fund_data);
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
  getReference = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };
  close = () => {
    console.log("Payment closed");
  };
  handleAutoSave = (event) => {
    if (event.target.checked == false) {
      this.setState({ autoSave: event.target.checked });
      this.props.deactivateAutoSave();
    } else {
      this.setState({ show: true });
    }
  };
  handleQuickSave = (event) => {
    this.setState({ showSave: true });
  };
  handleCloseQuickSave() {
    this.setState({ showSave: false });
  }
  handleWithdraw = (event) => {
    this.setState({ showWithdraw: true });
  };
  handleEdit = (id) => {
    const { edit_data } = this.state;
    this.setState({ showEdit: true, edit_data: { ...edit_data, id: id } });
  };
  handleCloseEdit() {
    this.setState({ showEdit: false });
  }
  handleCloseWithdraw() {
    this.setState({ showWithdraw: false });
  }
  handleSubmitWithdraw(event) {
    event.preventDefault();
    const { withdraw_data } = this.state;
    if (withdraw_data.amount) {
      this.props.withdrawRegularSavings(withdraw_data);
    } else {
      swal(`${"All fields are required"}`);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    const { data } = this.state;
    if (
      data.amount &&
      data.frequency &&
      data.start_date &&
      data.payment_method
    ) {
      this.props.createRegularSavings(data);
    } else {
      swal(`${"All field are required "}`);
    }
  }
  handleSubmitEdit(event) {
    event.preventDefault();
    const { edit_data } = this.state;
    if (
      edit_data.amount &&
      edit_data.frequency &&
      edit_data.start_date &&
      edit_data.payment_method
    ) {
      this.props.editRegularSavings(edit_data);
    } else {
      swal(`${"All field are required "}`);
    }
  }
  handleSubmitFund(event) {
    event.preventDefault();
    const { fund_data } = this.state;
    if (fund_data.amount) {
      this.props.addFundShareholdings(fund_data);
    } else {
      swal(`${"All fields are required"}`);
    }
  }
  handleChangeEdit = (event) => {
    const { edit_data } = this.state;
    const { name, value } = event.target;
    this.setState({ edit_data: { ...edit_data, [name]: value } });
  };
  handleChange = (event) => {
    const { data } = this.state;
    const { name, value } = event.target;
    this.setState({ data: { ...data, [name]: value } });
  };
  handleChangeWithdraw = (event) => {
    const { withdraw_data } = this.state;
    const { name, value } = event.target;
    this.setState({ withdraw_data: { ...withdraw_data, [name]: value } });
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
    this.setState({ show: false });
  }
  render() {
    let obj = {
      array: [],
    };
    for (var l = 0; l < 31; l++) {
      obj.array[l] = l + 1;
    }
    let { theme } = this.props;
    const {
      balance,
      tdetails,
      loading,
      auto_save,
      email,
      bank_details,
      edit_data,
      showEdit,
      transactions,
      fund_data,
      withdraw_data,
      autoSave,
      showSave,
      showWithdraw,
      data,
      cards,
      show,
      savings,
    } = this.state;
    return (
    <div className='m-sm-30'>
      <div>
        <div className='mb-sm-30'>
          <Breadcrumb routeSegments={[{ name: "Shareholdings" }]} />
        </div>
        {loading ? (
          <div
            style={{
              marginTop: 150,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyItems: "center",
            }}
          >
            <Loading />
          </div>
        ) : (
          <>
          {/* <CustomCarousel2 balance={balance} handleQuickSave={this.handleQuickSave} />           */}
            <div
              className='pb-2 pt-3 '
              // style={{backgroundImage: `url(${bgimage})`,
              //     backgroundRepeat: "no-repeat",
              //     backgroundPosition: "center center",
              //     backgroundAttachment: "fixed",}}
                  >
              
              <Grid container spacing={8}>
                {/* <Grid item lg={8} md={8} sm={4} xs={4}>
                  <Button
                    className='uppercase'
                    size='small'
                    variant='outlined'
                    style={{
                      borderBottomRightRadius: 10,
                      borderTopLeftRadius: 10,
                      borderColor: "#0d60d8",
                    }}
                    onClick={this.handleWithdraw}
                  >
                    Withdraw
                  </Button>
                </Grid> */}
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Button
                    className='uppercase px-2 py-1'
                    size='small'
                    variant='contained'
                    style={{
                      backgroundColor: "#222943",
                      color: "white",
                      borderRadius: 4
                    }}
                    onClick={this.handleQuickSave}
                  >
                    Quick Save
                  </Button>
                </Grid>
              </Grid>
            </div>
           {/* </CustomCarousel2> */}
            <div className='py-3' />
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <h4 className='card-title text-muted mb-4'>
                  Latest Transactions
                </h4>
                <TableCard transactions={tdetails} />
              </Grid>
              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <h4 className='card-title text-muted mb-4'>
                  My Account Details
                </h4>
                <Card elevation={3} className='pt-5 px-5 mb-6'>
                  <Grid container spacing={3}>
                    <Grid item lg={9} md={9} sm={9} xs={9}>
                      <Typography variant='h6'>
                        {savings.auto_status
                          ? "Turn OFF Auto save"
                          : "Turn ON Auto save"}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={3} xs={3}>
                      <Switch
                        checked={savings.auto_status ? true : false}
                        onChange={this.handleAutoSave}
                        value='checked'
                      />
                      {this.props.savings && <CircularProgress size={24} />}
                    </Grid>
                    {savings.auto_status ? (
                      <>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>Amount</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            {savings.amount}
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>Frequency</Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            {savings.frequency}
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            Start Date
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            {dateFormat(savings.start_date, "mmmm dS, yyyy")}
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            Payment Method
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Typography variant='subtitle1'>
                            {savings.payment_method}
                          </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Button
                            onClick={() => this.handleEdit(savings.id)}
                            contained
                            style={{
                              color: "#fff",
                              backgroundColor: "#0d60d8",
                            }}
                          >
                            Edit Auto save{" "}
                          </Button>
                        </Grid>
                      </>
                    ) : (
                      <div></div>
                    )}
                  </Grid>
                </Card>
              </Grid> */}
            </Grid>
          </>
        )}
      </div>
            
        {/* Quick Save Dialog Start */}
        <Dialog open={showSave} onClose={this.handleCloseQuickSave}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        scroll="body">
        <AppBar style={{ position: "relative", }} color='primary'>
        <Toolbar>
        <IconButton
        edge='start'
        color='inherit'
        onClick={this.handleCloseQuickSave}
        aria-label='Close'
        >
        <CloseIcon style={{color:'#fff'}}/>
        </IconButton>
        <Typography
        variant='h6'
        className='text-white'
        style={{ marginLeft: theme.spacing(2), flex: 1 }}
        >
        Fund Your Account
        </Typography>
        </Toolbar>
        </AppBar>
        <Card className='px-6 pt-2 pb-4'>
        <ValidatorForm
        ref='form'
        onSubmit={this.handleSubmitFund}
        onError={(errors) => null}
        >
        <Grid container spacing={6}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TextValidator
            className='mb-4 w-full'
            label='Enter Amount'
            onChange={this.handleChangeFund}
            type='number'
            name='amount'
            value={fund_data.amount}
            validators={["required"]}
            errorMessages={["this field is required"]}
          />
          <TextField
            className='mb-4 w-full'
            select
            label='Select Payment Frequency'
            value={fund_data.payment_method}
            name='payment_method'
            onChange={this.handleChangeFund}
            helperText='Please select frequency'
          >
            <MenuItem value={""}></MenuItem>
            <MenuItem value={"Wallet"}> Wallet</MenuItem>
            {/* <MenuItem value={"Debit Card"}> Debit Card </MenuItem> */}
          </TextField>                  
        </Grid>

        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card className='px-6 pt-2 pb-4'>
            <Typography variant='h6' gutterBottom>
              {numberFormat(fund_data.amount)}
            </Typography>
          </Card>
          <Card className='px-6 pt-2 pb-4'>
            <Typography variant='h6' gutterBottom>
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

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
            {this.props.savings && (
              <img
                img
                alt=''
                src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
              />
            )}  
          </div>      
        </Grid>
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {(fund_data.payment_method == "Wallet" || (fund_data.card_id !="0" && fund_data.card_id !="")) && 
          <Button className="uppercase"
            type="submit"
            size="large"
            variant="contained"
            style={{backgroundColor:"#222943", color:"#fff"}}>
            Add Fund
          </Button>}        
        </Grid>
        {fund_data.card_id == "" && fund_data.payment_method == "Debit Card" &&
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <PayOption callback={this.callback} amount={fund_data.amount} type={'03'} targetId={"00"}/>
        </Grid>}
        </Grid>
        </ValidatorForm>
        </Card>
        </Dialog>
        {/* Quick Save Dialog End */}

        {/* Edit Dialog start */}
        <Dialog open={showEdit} onClose={this.handleCloseEdit}
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
          <AppBar style={{ position: "relative", }} color='primary'>
            <Toolbar>
              <IconButton
                edge='start'
                color='primary'
                onClick={this.handleCloseEdit}
                aria-label='Close'
              >
               <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography
                variant='h6'
                className='text-white'
                style={{ marginLeft: theme.spacing(2), flex: 1 }}
              >
                Edit Auto Save Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className='px-6 pt-2 pb-4'>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ValidatorForm
                  ref='form'
                  onSubmit={this.handleSubmitEdit}
                  onError={(errors) => null}
                >
                  <TextValidator
                    className='mb-4 w-full'
                    label='Enter Amount'
                    onChange={this.handleChangeEdit}
                    type='number'
                    name='amount'
                    value={edit_data.amount}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    className='mb-4 w-full'
                    select
                    label='Select Frequency'
                    value={edit_data.frequency}
                    name='frequency'
                    onChange={this.handleChangeEdit}
                    helperText='Please select frequency'
                  >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}> Weekly</MenuItem>
                    <MenuItem value={"Monthly"}> Monthly </MenuItem>
                  </TextField>
                  {edit_data.frequency === "Monthly" && (
                    <TextField
                      className='mb-4 w-full'
                      select
                      label='Select Transaction Month'
                      value={edit_data.transaction_month}
                      name='transaction_month'
                      onChange={this.handleChangeEdit}
                      helperText='Please select Month'
                    >
                      {obj.array.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {edit_data.frequency === "Weekly" && (
                    <TextField
                      className='mb-4 w-full'
                      select
                      label=' Day of the Week'
                      value={edit_data.transaction_day}
                      name='transaction_day'
                      onChange={this.handleChangeEdit}
                      helperText='Please select Day'
                    >
                      <MenuItem value={"1"}>Monday</MenuItem>
                      <MenuItem value={"2"}>Tuesday</MenuItem>
                      <MenuItem value={"3"}>Wednesday</MenuItem>
                      <MenuItem value={"4"}>Thursday</MenuItem>
                      <MenuItem value={"5"}>Friday</MenuItem>
                      <MenuItem value={"6"}>Saturday</MenuItem>
                      <MenuItem value={"7"}>Sunday</MenuItem>
                    </TextField>
                  )}
                  <TextValidator
                    className='mb-4 w-full'
                    onChange={this.handleChangeEdit}
                    type='time'
                    name='transaction_time'
                    value={edit_data.transaction_time}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className='mb-4 w-full'
                    onChange={this.handleChangeEdit}
                    type='date'
                    name='start_date'
                    value={edit_data.start_date}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    className='mb-4 w-full'
                    id='standard-select-currency'
                    select
                    label='Select Payment Method'
                    value={edit_data.payment_method}
                    name='payment_method'
                    onChange={this.handleChangeEdit}
                    helperText='Please select Payment Method'
                  >
                    <MenuItem value={""}></MenuItem>
                    <MenuItem value={"Wallet"}> Wallet</MenuItem>
                    {/* <MenuItem value={"Debit Card"}> Debit Card </MenuItem> */}
                  </TextField>
                  {this.props.savings && (
                    <img
                      img
                      alt=''
                      src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                    />
                  )}
                  <Button
                    className='uppercase'
                    type='submit'
                    size='large'
                    variant='contained'
                    style={{ backgroundColor: "#222943", color: "#fff" }}
                  >
                    Edit Auto Save
                  </Button>
                </ValidatorForm>
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* Edit dialog end */}

        {/* Create Dialog start */}
        <Dialog open={show} onClose={this.handleClose}
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
          <AppBar style={{ position: "relative", }} color='primary'>
            <Toolbar>
              <IconButton
                edge='start'
                color='primary'
                onClick={this.handleClose}
                aria-label='Close'
              >
               <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography
                variant='h6'
                className='text-white'
                style={{ marginLeft: theme.spacing(2), flex: 1 }}
              >
                Create Auto Save Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className='px-6 pt-2 pb-4'>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <ValidatorForm
                  ref='form'
                  onSubmit={this.handleSubmit}
                  onError={(errors) => null}
                >
                  <TextValidator
                    className='mb-4 w-full'
                    label='Enter Amount'
                    onChange={this.handleChange}
                    type='number'
                    name='amount'
                    value={data.amount}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    className='mb-4 w-full'
                    select
                    label='Select Frequency'
                    value={data.frequency}
                    name='frequency'
                    onChange={this.handleChange}
                    helperText='Please select frequency'
                  >
                    <MenuItem value={"Daily"}>Daily</MenuItem>
                    <MenuItem value={"Weekly"}> Weekly</MenuItem>
                    <MenuItem value={"Monthly"}> Monthly </MenuItem>
                  </TextField>
                  {data.frequency === "Monthly" && (
                    <TextField
                      className='mb-4 w-full'
                      select
                      label='Select Transaction Month'
                      value={data.transaction_month}
                      name='transaction_month'
                      onChange={this.handleChange}
                      helperText='Please select Month'
                    >
                      {obj.array.map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  {data.frequency === "Weekly" && (
                    <TextField
                      className='mb-4 w-full'
                      select
                      label=' Day of the Week'
                      value={data.transaction_day}
                      name='transaction_day'
                      onChange={this.handleChange}
                      helperText='Please select Day'
                    >
                      <MenuItem value={"1"}>Monday</MenuItem>
                      <MenuItem value={"2"}>Tuesday</MenuItem>
                      <MenuItem value={"3"}>Wednesday</MenuItem>
                      <MenuItem value={"4"}>Thursday</MenuItem>
                      <MenuItem value={"5"}>Friday</MenuItem>
                      <MenuItem value={"6"}>Saturday</MenuItem>
                      <MenuItem value={"7"}>Sunday</MenuItem>
                    </TextField>
                  )}
                  <TextValidator
                    className='mb-4 w-full'
                    onChange={this.handleChange}
                    type='time'
                    name='transaction_time'
                    value={data.transaction_time}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className='mb-4 w-full'
                    onChange={this.handleChange}
                    type='date'
                    name='start_date'
                    value={data.start_date}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  <TextField
                    className='mb-4 w-full'
                    id='standard-select-currency'
                    select
                    label='Select Payment Method'
                    value={data.payment_method}
                    name='payment_method'
                    onChange={this.handleChange}
                    helperText='Please select Payment Method'
                  >
                    <MenuItem value={""}></MenuItem>
                    {/* <MenuItem value={"Wallet"}> Wallet</MenuItem> */}
                    {/* <MenuItem value={"Debit Card"}> Debit Card </MenuItem> */}
                  </TextField>
                  {this.props.savings && (
                    <img
                      img
                      alt=''
                      src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                    />
                  )}
                  <Button
                    className='uppercase'
                    type='submit'
                    size='large'
                    variant='contained'
                    style={{ backgroundColor: "#222943", color: "#fff" }}
                  >
                    Create Auto Save
                  </Button>
                </ValidatorForm>
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* Create dialog end */}

        {/* withdraw Dialog start */}
        <Dialog open={showWithdraw} onClose={this.handleCloseWithdraw}
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
          <AppBar style={{ position: "relative", }} color='primary'>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={this.handleCloseWithdraw}
                aria-label='Close'
              >
               <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography
                variant='h6'
                className='text-white'
                style={{ marginLeft: theme.spacing(2), flex: 1 }}
              >
                Withdraw To Wallet
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className='px-6 pt-2 pb-4'>
            <ValidatorForm
              ref='form'
              onSubmit={this.handleSubmitWithdraw}
              onError={(errors) => null}
            >
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextValidator
                    className='mb-4 w-full'
                    label='Enter Amount'
                    onChange={this.handleChangeWithdraw}
                    type='number'
                    name='amount'
                    value={withdraw_data.amount}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  {this.props.savings && (
                    <img
                      img
                      alt=''
                      src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                    />
                  )}
                  <Button
                    className='uppercase'
                    type='submit'
                    size='large'
                    variant='contained'
                    style={{ backgroundColor: "#222943", color: "#fff" }}
                  >
                    Withdraw Fund
                  </Button>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Card className='px-6 pt-2 pb-4'>
                    <Typography variant='h6' gutterBottom>
                      {numberFormat(withdraw_data.amount)}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        {/* withdraw dialog end */}
      </div>
    );
  }
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  deactivateAutoSave: userActions.deactivateAutoSave,
  createRegularSavings: userActions.createRegularSavings,
  addFundShareholdings: userActions.addFundShareholdings,
  withdrawRegularSavings: userActions.withdrawRegularSavings,
  editRegularSavings: userActions.editRegularSavings,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles(
  {},
  { withTheme: true }
)(withRouter(connect(mapState, actionCreators)(Shareholdings)));
