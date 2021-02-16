import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Typography, Grid, AppBar, Dialog, IconButton, Toolbar, Card, Avatar, List, ListItemAvatar, ListItem, MenuItem, TextField, ListItemText, Checkbox, Slide } from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import DoneAll from '@material-ui/icons/DoneAll';
import CloseIcon from "@material-ui/icons/Close";
import {getConfig, setLastUrl, numberFormat} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import Loading from "matx/components/MatxLoading/MatxLoading";
import MyRequest from "./components/MyRequest";
import CompleteRequest from "./components/CompleteRequest";
import swal from "sweetalert";
import PayCard from "app/views/dashboard/shared/PayCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import BusinessDetails from "./components/BusinessDetails";
import OrderTrans from "../ProductFinance/components/OrderTrans";
import dateFormat from "dateformat"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class MyBusinessLoan extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem('token');
    let email = localStorage.getItem("email");
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let date =
      currentDate.getFullYear() + "-" + month + "-" + currentDate.getDate();
    this.state={
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
      tab: true,
      requested_business:[],
      business_view:[],
      cards:[],
      loan_bal:0,
      id:true,
      loading:true,
      showViewTrans:false,
      showManageLoan:false
    }

    
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.handleDelete =this.handleDelete.bind(this);
    this.handleAcceptLoan =this.handleAcceptLoan.bind(this);
    this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
    this.handleChangeFund = this.handleChangeFund.bind(this);
    this.handleSubmitFund = this.handleSubmitFund.bind(this);
    this.fetchLoanDetails = this.fetchLoanDetails.bind(this);
    this.handleCreateManageLoan = this.handleCreateManageLoan.bind(this);
    this.handleViewTrans = this.handleViewTrans.bind(this);
    this.repaymentsDetails = this.repaymentsDetails.bind(this);
    this.handleCloseViewTrans = this.handleCloseViewTrans.bind(this);

  
      
}
componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
      // this.fetchAllLoanApi(requestOptions);
      fetch(getConfig('display_request'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        console.log(response)
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log(data)
      if(data.success == false  || data.length == 0 ){
        this.setState({ requested_business: []});
      }else{
        let newArray = [];
        data.forEach(d => {
          if(d.request_status == 3){
            newArray.push(d)
            }
        });
        this.setState({requested_business: newArray, loading:false });
      }  
    })
    .catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
      }
    });
    fetch(getConfig('display_request'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        console.log(response)
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log(data)
      if(data.success == false  || data.length == 0 ){
        this.setState({ business_view: [], loading:false});
      }else{
        let newArray = [];
        data.forEach(d => {
          if(d.request_status == 1 || d.request_status == 2 || d.request_status == 11){
            newArray.push(d)
          }else if(newArray.success === [] || newArray === 0){
            this.setState({ business_view: [], loading:false});
          } else{        
            this.setState({business_view: newArray, loading:false });
          }          
        });console.log(newArray)
        this.setState({business_view: newArray, loading:false });
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
  }

  fetchLoanDetails=(id)=>{
    const {token} = this.state
      let requestOptions = this.getRequestOpt
      fetch(getConfig('businessRepaymentDetails')+ id  +"?token=" + token, requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.success == false){
          this.setState({repayment_details: [], pagination:[]})
        }else{
          this.setState({repayment_details: data, pagination:data})
        }
      })
      .catch(error => {
         if (error === "Unauthorized") {
          this.props.timeOut()
         }
      });
    }

    repaymentsDetails=(id)=>{
      const requestOptions = {
          method: 'GET',
          headers: { ...authHeader(), 'Content-Type': 'application/json' },
      };
  
      fetch(getConfig("businessRepaymentDetails") + id, requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }console.log(data)
      if(data.success == false || data.total == []){
        this.setState({data: [], pagination:[], isLoading:false});
      }else{
        this.setState({data: data.data, pagination:data, isLoading:false});
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
      this.props.business_repayments(fund_data);
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
  ongoingTab() {
    this.setState({ tab: true });
  }
  completeTab() {
    this.setState({ tab: false });
  }

  handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.rejectRequest(id);
        console.log(id)
        swal("Loading...",{   
          buttons:false
        });
      }
    });
    }
  handleAcceptLoan = (id) => {
    swal({
      title: "Are you sure,",
      text: "You want to Accept this Request?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.props.acceptRequest(id)
        console.log(id)
        swal("Loading...",{   
          buttons:false
        });
      }
    });
    }

  handleChangeFund = event => {
    const {fund_data, loan_bal} = this.state
    const {name, value, checked} = event.target
    if(name == "save_card"){
      this.setState({fund_data:{...fund_data, [name]:checked, save_card:true}})
    }else{
      this.setState({fund_data:{...fund_data, [name]:value}})
    }
    // if(name =="repayment_amount" && value > loan_bal){
    //     swal(`${"Repaid Amount is more than your remaining balance"}`);
    // }
  };
  
  // handleCreateRepayment = (id) => {
  //   this.setState({loading: true});
  //   const {repay_data, token} = this.state
  //   fetch(getConfig("loanBalance")+id + "?token="+token, this.getRequestOpt)
  //       .then(async response => {
  //       const data = await response.json();
  //       if (!response.ok) {
  //           const error = (data && data.message) || response.statusText;
  //           return Promise.reject(error);
  //       }
  //       this.setState({loan_bal: data})
  //   })
  //   .catch(error => {
  //     if (error === "Unauthorized") {
  //         this.props.timeOut()
  //       }
  //   });
  //   this.setState({showrepayment: true, repay_data: {...repay_data, id: id} });
  // }
  
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
          this.props.business_repayments(fund_data);
      }else{
          swal(
              `${"All fields are required"}`
          );
      }
    }
  
  handleQuickSave = (id) => {
      this.setState({isLoading:true})
      const {fund_data} = this.state
      this.setState({showSave: true, fund_data:{...fund_data, id: id}});
    }

  handleCreateManageLoan = (id) => {
    this.setState({loading:true})
    this.fetchLoanDetails(id)
    this.setState({showManageLoan: true});
  }

  handleViewTrans = (id) => {
    this.setState({ isLoading: true });
    this.repaymentsDetails(id);
    this.setState({ showViewTrans: true });
  };

  handleCloseManageLoan() {
    this.setState({showManageLoan:false});
  }
  handleCloseQuickSave() {
    this.setState({showSave:false});
  }
  
  handleCloseViewTrans() {
    this.setState({showViewTrans:false});
  }

render(){
  const {tab,loading,data,type,targetId,isLoading,requested_business,business_view,showSave,fund_data,cards,showManageLoan,repayment_details, showViewTrans} = this.state
   return (
    <div className="">       
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
                    color='primary'
                    variant={tab ? "contained" : "outlined"}
                    style={{ color: tab ? "#fff" : "#000" }}
                    onClick={this.ongoingTab}
                  >
                    Ongoing
                  </Button>
                  <Button
                    size='small'
                    color='primary'
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
                        borderColor: "#0d60d8",
                        borderRadius:8,
                      }}
                    >
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                      {business_view.length != 0 ? (
                        business_view.map((data, index) => (
                          // data.request_status == 1 || data.request_status == 2 ? 
                          <MyRequest
                            key={index}
                            status={false}
                            amount={numberFormat(data.requested_amount)}
                            repaid={numberFormat(data.amount_repaid)}
                            admin_price={data.total_amount}                           
                            status={data.request_status}
                            end_date={dateFormat(data.end_date, "mmmm dS, yyyy")}
                            title={data.business_name}
                            images={(data.image)}
                            decline={()=>this.handleDelete(data.id)}
                            repay={()=>this.handleQuickSave(data.id)}
                            // view={() => this.handleView(data.id)}
                            view={()=>this.handleCreateManageLoan(data.id)}
                            viewTrans={() => this.handleViewTrans(data.id)}
                            />
                            // :
                          // <Typography variant='body1'>
                            // {/* No Ongoing Business */}
                        // </Typography>
                        ))
                      ) : (
                        <Typography variant='body1'>
                        No Ongoing Business Finance Request
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
                        borderColor: "#0d60d8",
                        borderRadius:8,
                      }}
                    >
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                      {requested_business.length != 0 ? (
                        requested_business.map((data, index) => (
                          // data.request_status == 3 ? 
                          <CompleteRequest
                          key={index}
                          status={false}
                          amount={numberFormat(data.requested_amount)}
                          // balance={numberFormat(data.remaining_balance)}
                          admin_price={numberFormat(data.total_amount)}                           
                          status={data.request_status}
                          title={data.business_name}
                          images={(data.image)}
                          // decline={()=>this.handleDelete(data.id)}
                          // accept={()=>this.handleAcceptLoan(data.id)}
                          view={()=>this.handleCreateManageLoan(data.id)}
                          viewTrans={() => this.handleViewTrans(data.id)}
                            // repay={() => this.handleQuickSave(data.id)}
                          />
                        //   :
                        //   <Typography variant='body1'>
                        //     No Completed Business Finance Request
                        // </Typography>
                        ))
                      ) 
                      : (
                        <Typography variant='body1'>
                         No Completed Business Finance Request
                        </Typography>
                      )}
                      </Grid>
                    </div>
                  )}
                </Grid>
              </Grid>
            </>
          )} 

            {/* Quick Save Dialog Start */}
          <Dialog
              open={showSave}
              onClose={this.handleCloseQuickSave}
              scroll="body"
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              >
            <AppBar style={{position: "relative"}} color="primary">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="#fff"
                  onClick={this.handleCloseQuickSave}
                  aria-label="Close"
                >
                  <CloseIcon style={{color:'#fff'}}/>
                </IconButton>
                <Typography variant="h6" className="text-white" style={{marginLeft: 'theme.spacing(2)', flex: 1}}>
                  Business Loan Repayment
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
                    color="primary"
                    variant="contained"
                    style={{color:"#fff"}}>
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
                    <PayOption callback={this.callback} type={'08'} targetId={'00'} amount={fund_data.repayment_amount}/>
                  </Grid>}
                </Grid>
              </ValidatorForm>
            </Card>
            </Dialog>
            {/* Quick Save Dialog End */}
           

           {/* View Dialog start */}
              <Dialog
              TransitionComponent={Transition}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
              open={showViewTrans}
              onClose={this.handleCloseViewTrans}
            >
                <AppBar color="primary" className="text-white" style={{position: "relative"}}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={this.handleCloseViewTrans}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className="text-white" style={{marginLeft: "theme.spacing(2)", flex: 1, color:"#fff"}}>
                      Repayment Transactions
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Card className="px-6 pt-2 pb-4">
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {isLoading ?
                    <Typography>Loading...</Typography>:
                    <BusinessDetails transactions={data} />
                    }
                  </Grid>
                </Grid>
              </Card>
            </Dialog>
            {/* View dialog end */} 
    </div>
  );
}
}
// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  acceptRequest: userActions.acceptRequest,
  rejectRequest: userActions.rejectRequest,
  business_repayments: userActions.business_repayments,
  saveWallet: userActions.saveWallet
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(MyBusinessLoan))
);