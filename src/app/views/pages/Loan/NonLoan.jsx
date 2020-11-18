import React from "react";
import { Breadcrumb, SimpleCard } from "matx";
import StatCards2 from "../../dashboard/shared/StatCards2";
import {getConfig, numberFormat, payID, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import history from '../../../../history'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button, Switch, IconButton, TextField, MenuItem, ButtonGroup,
  Typography,
  Toolbar,
  AppBar,
  Dialog,
  Checkbox,
  Slide,} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import Lottie from 'react-lottie';
import cube from "../../../../lottiefiles/26519-cube-spinning";
import swal from 'sweetalert'
import TableCard from "./components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import TargetTransactionCard from "../Shareholdings/components/TargetTransactionCards";
import LoanTable from "./components/LoanTable";
import GuaranteeDetails from "./components/GuaranteeDetails";
import ComLoanTable from "./components/ComLoanTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class NonLoan extends Component{
  constructor(props){
    super(props)
    setLastUrl()
        var currentDate = new Date();
        let month = currentDate.getMonth() + 1
        let date = currentDate.getFullYear() +'-'+month+'-'+ currentDate.getDate();
        this.state={
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
        singleLoan:[],
        balance: 0.00,
        tdetails: [],
        singleLoan:[],
        repayment_details:[],
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
        this.fetchSingleNonGroupLoan = this.fetchSingleNonGroupLoan.bind(this);
        // this.fetchSingleTarget = this.fetchSingleTarget.bind(this);
        this.ongoingTab = this.ongoingTab.bind(this);
        this.completeTab = this.completeTab.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleView = this.handleView.bind(this);
        this.handleCloseSaveCard = this.handleCloseSaveCard.bind(this);
        this.handleSaveCard = this.handleSaveCard.bind(this);
        this.handleChangeAddCard = this.handleChangeAddCard.bind(this);
        this.handleCloseWithdraw = this.handleCloseWithdraw.bind(this);
        this.handleDelete =this.handleDelete.bind(this);
        this.handleAcceptLoan =this.handleAcceptLoan.bind(this);
        this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
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
    fetch(getConfig('showGuarantorTable'), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      console.log(data)
      if(data.success == false){
        this.setState({tdetails: [], balance: 0, completed: [], accounts:[], loading:false })
      }else{
        let newArray = [];
        let newArrays = [];
            data.forEach(d => {
              if(d.loan_status == 0){
                newArray.push(d)
                console.log(newArray)
              }else{
                newArrays.push(d)
                console.log(newArrays)
              }
            });
        this.setState({tdetails: newArray, balance: data[0], completed: newArrays, accounts:data[3], loading:false })
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
fetchSingleNonGroupLoan=(loan_id)=>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("showNonGroupLoan") + loan_id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  if(data.success == false || data.total == 0){
    this.setState({singleLoan: [], pagination:[], isLoading:false});
  }else{
    this.setState({singleLoan: data, pagination:data, isLoading:false});
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
handleSaveCard = event => {
  this.setState({showSaveCard: true});
}

handleCloseSaveCard() {
  this.setState({showSaveCard:false});
}

handleView = (loan_id) => {
  console.log(loan_id)
  this.setState({isLoading:true})
  this.fetchSingleNonGroupLoan(loan_id)
  this.setState({showView: true});
}
handleEdit = (id) => {
  this.setState({isLoading:true})
  this.fetchSingleTarget(id)
  const {edit_data} = this.state
  this.setState({showEdit: true, edit_data:{...edit_data, id: id}});
}
handleDelete = (group_id, loan_id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.props.declineLoan(group_id, loan_id);
      console.log(group_id, loan_id)
      swal("Loading...",{   
        buttons:false
      });
    }
  });
  }
handleAcceptLoan = (group_id, loan_id) => {
  swal({
    title: "Are you sure,",
    text: "You want to Accept this Request?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.props.acceptLoan(group_id, loan_id)
      console.log(group_id, loan_id)
      swal("Loading...",{   
        buttons:false
      });
    }
  });
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

// modal close handler
handleClose() {
  this.setState({showView:false});
}
handleCloseEdit() {
  this.setState({showEdit:false});
}
// handleCloseView() {
//   this.setState({showView:false});
// }
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
    const {balance, tdetails, loading, isLoading, singleLoan,repayment_details, tab, cards, add_card, showSaveCard, id, auto_save, edit_data, showEdit, showView, completed, email, bank_details, fund_data,  autoSave, accounts, showSave,showWithdraw, data, show, savings} = this.state
    return (
    <div className="m-sm-10">
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#222943",borderRadius:8}}>  
          <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button size="small"
                          variant={tab? "contained" : "outlined"}
                          style={{backgroundColor: tab ? "#222943":"", color: tab ? 'white':""}}
                          onClick={this.ongoingTab}>Ongoing
                      </Button>
                      <Button 
                          size="small"
                          variant={tab? "outlined" : "contained"}
                          style={{backgroundColor: tab ? "":"#222943", color: tab ? "":"white"}}
                          onClick={this.completeTab}>Completed
                      </Button>
                  </ButtonGroup>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              {tab &&
             <div className="px-2 bg-default" >                    
                    <LoanTable 
                    tdetails={tdetails}
                    view={this.handleView}
                    declineLoan={this.handleDelete}
                    approvalLoan={this.handleAcceptLoan}
                    />
                  
              </div>
              }
              {!tab &&
              <div className="px-2 bg-default">
                    <ComLoanTable 
                    view={this.handleView}
                    tdetails={completed}
                    />
              </div>
            }
              
              </Grid>  
          </Grid>
        </div>
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
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                View Guarantors
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
          </Card>
        </Dialog>
        {/* Quick Save Dialog End */}

         {/* Loan Manage Dialog Start */}
        <Dialog
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
          open={showView}
          onClose={this.handleClose}
          scroll="body">
          <AppBar style={{position: "relative", backgroundColor:"#222943"}}>
            <Toolbar>
              <IconButton
                edge="start"
                style={{color:'#fff'}}
                onClick={this.handleClose}
                aria-label="Close">
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Loan Guarantors
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid",     borderColor:"#222943", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
                  <GuaranteeDetails
                  data={singleLoan} 
                  // approvals={repayment_details} 
                  // resend_notif={()=>this.confirmAlert("Resend Loan Notification", 0, data.loan_group, data.user_id)} 
                />
                </div>
                }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* Loan Manage Dialog End */}
            
        {/* Edit Dialog start */}
        <Dialog
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
          scroll="body"
          open={showEdit}
          onClose={this.handleCloseEdit}>
          <AppBar style={{position: "relative",}} color='primary'>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseEdit}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"white"}}>
                Edit Target Savings
              </Typography>
            </Toolbar>
          </AppBar> 
          <Card className="px-6 pt-2 pb-4">
         
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
  acceptLoan: userActions.acceptLoan,
  declineLoan: userActions.declineLoan,
  editTargetSavings: userActions.editTargetSavings,
  exitTargetSavings: userActions.exitTargetSavings,
  activateTargetAutosave: userActions.activateTargetAutosave,
  deactivateTargetAutosave: userActions.deactivateTargetAutosave,
};

const mapState=(state) => ({
  savings: state.savings
})
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(NonLoan))
);
