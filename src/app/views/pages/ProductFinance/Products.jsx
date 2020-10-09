import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {
  getConfig,
  numberFormat,
  payID,
  setLastUrl,
} from "../../../config/config";
import { authHeader } from "../../../redux/logic";
import history from "../../../../history";
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
  Dialog, Checkbox
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Lottie from "react-lottie";
import cube from "../../../../lottiefiles/26519-cube-spinning";
import swal from "sweetalert";
import TableCard from "../savings/components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import MyProduct from "./components/MyProduct";
import OrderDetails from "./components/OrderDetails";
import PayCard from "app/views/dashboard/shared/PayCard";
import CompleteProduct from "./components/CompleteProduct";

class Target extends Component {
  constructor(props) {
    super(props);
    setLastUrl();
    let email = localStorage.getItem("email");
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let date =
      currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();
    this.state = {
      fund_data:{
        id:"",
        repayment_amount: "",
        date_time: date,
        payment_method: "",
        save_card:true,
        paystack_id: "",
        card_id:"0"
    },
    add_card:{
      repayment_amount: 100,
      date_time: date,
      payment_method: "Debit Card",
      save_card:true,
      paystack_id: "",
      card_id:""
  },
        my_products:[],
        tab: true,
        loading:true,
        showView:false,
        isLoading:true,
        showSave:false,
        showSaveCard:false,
        cards:[],
        id:true
    };    
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.handleView = this.handleView.bind(this);
    this.fetchSingleTargetTransaction = this.fetchSingleTargetTransaction.bind(this);
    this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
    this.handleCloseView = this.handleCloseView.bind(this);
    this.handleChangeFund = this.handleChangeFund.bind(this);
    this.handleSubmitFund = this.handleSubmitFund.bind(this);

  }

componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
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
    fetch(getConfig("fetchUserProducts"), requestOptions)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
         if (data.success == false) {
          this.setState({ my_products: [] });
        } else {
          this.setState({ my_products: data, loading: false });
        }
        console.log(data)
      })
      .catch((error) => {
        if (error === "Unauthorized") {
          this.props.timeOut();
        }
        this.setState({ loading: false });
      });
  }
  
fetchSingleTargetTransaction=(order_id)=>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getOrderDetails") + order_id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }console.log(data)
  if(data.success == false || data.total == 0){
    this.setState({singleTargetTransaction: [], pagination:[], isLoading:false});
  }else{
    this.setState({singleTargetTransaction: data, pagination:data, isLoading:false});
  } 
})
  .catch(error => {
      if (error === "Unauthorized") {
          this.props.timeOut()
      }
      this.setState({isLoading:false})
  });
}

callback = (response) => {
  const {fund_data, add_card} = this.state
  if (fund_data.repayment_amount ) {
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
    this.props.orderRepayments(fund_data);
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

handleSubmitFund(event) {
  event.preventDefault();
  const { fund_data } = this.state;
  if (fund_data.repayment_amount && fund_data.card_id != "") {
      this.props.orderRepayments(fund_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}

  handleView = (id) => {
    this.setState({ isLoading: true });
    this.fetchSingleTargetTransaction(id);
    this.setState({ showView: true });
  };  

  handleQuickSave = (id) => {
    this.setState({isLoading:true})
    const {fund_data} = this.state
    this.setState({showSave: true, fund_data:{...fund_data, id: id}});
  }
  ongoingTab() {
    this.setState({ tab: true });
  }
  completeTab() {
    this.setState({ tab: false });
  }
  handleCloseView() {
    this.setState({showView:false});
  }
  handleCloseQuickSave() {
    this.setState({showSave:false});
  }
  render() {
    let obj = {
      array: [],
    };
    for (var l = 0; l < 31; l++) {
      obj.array[l] = l + 1;
    }
    let { theme } = this.props;
    const {my_products, tab, loading, showView, isLoading, 
      singleTargetTransaction, fund_data, showSave ,cards,} = this.state;
    return (
      <div className='m-sm-30'>
        <div className='mb-sm-30'>
          <Breadcrumb routeSegments={[{ name: "My Products" }]} />
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
            <Grid container spacing={2}>              
            </Grid>
            <Grid container spacing={3}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button
                  size='small'
                  color='secondary'
                  variant={tab ? "contained" : "outlined"}
                  style={{ color: tab ? "#fff" : "#000" }}
                  onClick={this.ongoingTab}
                >
                  Ongoing
                </Button>
                <Button
                  size='small'
                  color='secondary'
                  variant={tab ? "outlined" : "contained"}
                  style={{ color: tab ? "#000" : "#fff" }}
                  onClick={this.completeTab}
                >
                  Completed
                </Button>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {tab && (
                  <div
                    className='pb-5 pt-7 px-2 bg-default'
                    style={{
                      border: 1,
                      borderStyle: "solid",
                      borderColor: "#e74398",
                      borderRadius:8,
                    }}
                  >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    {my_products.length != 0 ? (
                      my_products.map((data, index) => (
                        data.order_status == 1 || data.order_status == 3 || data.order_status == 5 ? 
                        <MyProduct
                          key={index}
                          status={false}
                          withdrawStatus={data.withdraw_status}
                          amount={numberFormat(data.total)}
                          balance={numberFormat(data.remaining_balance)}
                          amount_paid={numberFormat(data.amount_paid)}
                          value={
                            (100 * data.target_balance) / data.targeted_amount
                          }
                          autoSave={(e) =>
                            this.handleTargetAutoSave(data.id, e)
                          }
                          status={data.order_status}
                          title={data.order_no}
                          stop={() => this.handleStopPlan(data.id)}
                          view={() => this.handleView(data.id)}
                          repay={() => this.handleQuickSave(data.id)}
                        />:
                        <Typography variant='body1'>
                        
                      </Typography>
                      ))
                    ) : (
                      <Typography variant='body1'>
                        No Ongoing Products
                      </Typography>
                    )}
                    </Grid>
                  </div>
                )}
                {!tab && (
                  <div
                    className='pb-5 pt-7 px-2 bg-default'
                    style={{
                      border: 1,
                      borderStyle: "solid",
                      borderColor: "#e74398",
                      borderBottomRightRadius: 20,
                      borderTopLeftRadius: 20,
                    }}
                  >
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    {my_products.length != 0 ? (
                      my_products.map((data, index) => (
                        data.order_status == 2 || data.order_status == 4 || data.order_status == 6 ? 
                        <CompleteProduct
                          key={index}
                          status={false}
                          withdrawStatus={data.withdraw_status}
                          amount={numberFormat(data.total)}
                          value={
                            (100 * data.target_balance) / data.targeted_amount
                          }
                          autoSave={(e) =>
                            this.handleTargetAutoSave(data.id, e)
                          }
                          status={data.order_status}
                          title={data.order_no}
                          stop={() => this.handleStopPlan(data.id)}
                          view={() => this.handleView(data.id)}
                          repay={() => this.handleQuickSave(data.id)}
                        />:
                        <Typography variant='body1'>
                        
                      </Typography>
                      ))
                    ) 
                    : (
                      <Typography variant='body1'>
                        No Completed Products
                      </Typography>
                    )}
                    </Grid>
                  </div>
                )}
              </Grid>
            </Grid>
          </>
        )}  
         {/* View Dialog start */}
         <Dialog
          open={showView}
          onClose={this.handleCloseView}
        >
            <AppBar color="primary" className="text-white" style={{position: "relative"}}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                  Order Details
                </Typography>
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                <OrderDetails transactions={singleTargetTransaction} />
                }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* View dialog end */} 
        
        {/* Quick Save Dialog Start */}
        <Dialog
          open={showSave}
          onClose={this.handleCloseQuickSave}
          scroll="body">
        <AppBar style={{position: "relative", backgroundColor:"#0d60d8"}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this.handleCloseQuickSave}
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
            onSubmit={this.handleSubmitFund}
            onError={errors => null}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Enter Amount"
                  onChange={this.handleChangeFund}
                  type="number"
                  name="repayment_amount"
                  value={fund_data.repayment_amount}
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
                style={{backgroundColor:"#0d60d8", color:"#fff"}}>
                Add Fund
              </Button>}
              </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-4">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(fund_data.repayment_amount)}
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
                <PayOption callback={this.callback} amount={fund_data.repayment_amount}/>
              </Grid>}
            </Grid>
          </ValidatorForm>
        </Card>
      </Dialog>
        {/* Quick Save Dialog End */}
        
      </div>
    );
  }
}

// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  createTargetSavings: userActions.createTargetSavings,
  orderRepayments: userActions.orderRepayments,
  withdrawTargetSavings: userActions.withdrawTargetSavings,
  editTargetSavings: userActions.editTargetSavings,
  exitTargetSavings: userActions.exitTargetSavings,
  activateTargetAutosave: userActions.activateTargetAutosave,
  deactivateTargetAutosave: userActions.deactivateTargetAutosave,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles(
  {},
  { withTheme: true }
)(withRouter(connect(mapState, actionCreators)(Target)));
