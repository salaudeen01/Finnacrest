import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Typography, Grid, AppBar, Dialog, IconButton, Toolbar, Card, Avatar, List, ListItemAvatar, ListItem, MenuItem, TextField, ListItemText, Checkbox, DialogActions, Icon, Slide } from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import DoneAll from '@material-ui/icons/DoneAll';
import CloseIcon from "@material-ui/icons/Close";
import {getConfig, setLastUrl, numberFormat, checkLastUrl, checkUserStatus} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import TodoList from "./components/TodoList";
import LoanCards from "./components/LoanCards";
import LoanGroupCard from "./components/LoanGroupCard";
import LoanGroupDetailsCard from "./components/LoanGroupDetailsCard";
import swal from 'sweetalert'
import PayOption from "app/views/dashboard/shared/PayOption";
import ManageLoanCard from "./components/ManageLoanCard";
import { blue } from '@material-ui/core/colors';
import LoanDetailsCard from "./components/LoanDetailsCard";
import CustomCarousel from "../investments/components/CustomCarousel";
import Loading from "matx/components/MatxLoading/MatxLoading";
import LoanApprovalCard from "./components/LoanApprovalCard";
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import CustomTab from "./components/CustomTab";
import { Autocomplete } from "@material-ui/lab";
import ModalForm from "../transactions/ModalForm";
import NumberFormat from "react-number-format";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Loan extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem('token');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    let rand_id =this.getRand()
    this.state={
      data:{
        loan_amount:"",
        payment_duration:"",
        frequency:"",
        repayment_amount:"",
        loan_group:"",
        start_date:"",
        payment_method:"Card",
        user_id:"",
        group_id:0,
    },    
    add_card: {
      amount: "100",
      date_time: entry_date,
      payment_method: "Debit Card",
      paystack_id: "",
      save_card:true,
      card_id:"0"
  },
    replace_data:{
      name:"",
      email:"",
      id:"",
      request_id:""
  },
    group_data: {
      name2:"",
      email2:"",
      name3:"",
      email3:"",
      name4:"",
      email4:"",
      name5:"",
      email5:"",
      group_name:"",
      group_id:"cub"+rand_id
  },
  repay_data:{
        id:"",
        trans_date: entry_date,
        payment_method: "Wallet",
        repayment_amount: 0,
        paystack_id:"",
        save_card:false,
        card_id:"0"
    },
    formList:[
        {
          user_id:"",
          guaranteed_amount:""
      },],

      users:[],
      index:3,
      user:user,
      token:token,
      loan_bal:"",
      loading:false,
      tab:0,
      group_table: false,
      group_request_status: 0,
      group_member_status: 0,
      cards:[],
      loan_group: [],
      loan_details: [],
      loan_activities:[],
      group_details:[],
      repayment_details:[],
      pagination:[],
      loan_approval:[],
      manage_details:[],
      group_members:[],
      group_name:[],
      Completed:[],
      showReplace:false,
      modal:false,
      modalForm:false, 
      modalFee:false,
      registrationFee: 0,
      showSave:false,
      showLoan:false,
      showAction:false,
      showLoanApproval:false,
      showGroup:false,
      showApproval:false,
      showManage:false,
      showDetails:false,
      showrepayment:false,
      showManageLoan:false,
      isFetching:true,
      loan_avail_amount:"",
      repayment_duration:"",
      group_id: "",
      request_id:"",
      code:"",
      tdetails:"",
      id:true
    }
    this.ongoingTab = this.ongoingTab.bind(this);
    this.completeTab = this.completeTab.bind(this);
    this.approvalTab = this.approvalTab.bind(this);
    this.fetchLoanGroupDetails = this.fetchLoanGroupDetails.bind(this);
    this.fetchLoanDetails = this.fetchLoanDetails.bind(this);
    this.fetchLoanApprovals = this.fetchLoanApprovals.bind(this);
    this.fetchAllLoanApi = this.fetchAllLoanApi.bind(this);
    this.confirmAlert = this.confirmAlert.bind(this)
    this.handleSubmitReplace = this.handleSubmitReplace.bind(this);
    this.handleChangeReplace = this.handleChangeReplace.bind(this);
    this.handleSubmitLoan = this.handleSubmitLoan.bind(this);
    this.handleChangeLoans = this.handleChangeLoans.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDaChange = this.handleDaChange.bind(this);
    this.handleSubmitGroup = this.handleSubmitGroup.bind(this);
    this.handleChangeGroup = this.handleChangeGroup.bind(this);
    this.handleSubmitRepay = this.handleSubmitRepay.bind(this);
    this.handleChangeRepay = this.handleChangeRepay.bind(this);
    this.handleQuickSave = this.handleQuickSave.bind(this);
    this.handleShowApproval = this.handleShowApproval.bind(this);
    this.handleShowAction = this.handleShowAction.bind(this);
    this.handleCreateReplace = this.handleCreateReplace.bind(this);
    this.handleCreateLoan = this.handleCreateLoan.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
    this.handleCreateManage = this.handleCreateManage.bind(this);
    this.handleCreateDetails = this.handleCreateDetails.bind(this);
    this.handleCreateRepayment = this.handleCreateRepayment.bind(this);
    this.handleCreateManageLoan = this.handleCreateManageLoan.bind(this);
    this.handleCloseApproval = this.handleCloseApproval.bind(this);
    this.handleCloseAction = this.handleCloseAction.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseReplace = this.handleCloseReplace.bind(this);
    this.handleCloseLoan = this.handleCloseLoan.bind(this);
    this.handleCloseGroup = this.handleCloseGroup.bind(this);
    this.handleCloseManage = this.handleCloseManage.bind(this);
    this.handleCloseDetails = this.handleCloseDetails.bind(this);
    this.handleCloseRepayment = this.handleCloseRepayment.bind(this);
    this.handleCloseManageLoan = this.handleCloseManageLoan.bind(this);
    this.handleOpenModalForm = this.handleOpenModalForm.bind(this);
    this.handleCloseModalForm = this.handleCloseModalForm.bind(this);
    this.handleOpenModalFee = this.handleOpenModalFee.bind(this);
    this.handleCloseModalFee = this.handleCloseModalFee.bind(this);
    this.getRand = this.getRand.bind(this);
    this.getRequestOpt = this.getRequestOpt.bind(this);
    this.callback = this.callback.bind(this);    
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

callback = (response) => {
  const { repay_data, add_card, key } = this.state;
  if (repay_data.trans_date && repay_data.repayment_amount) {
    this.setState({repay_data:{...repay_data, paystack_id: response.reference }})
    swal("Loading...", {
      buttons: false
    })
  }else {
    this.setState({add_card:{...add_card, paystack_id: response.reference }, showSave:false})
    swal("Saving Card...", {
      buttons: false
    })
  }
}
componentDidUpdate(){
  const { repay_data, add_card, data } = this.state;
  if (repay_data.paystack_id !== "") {
    this.props.addLoanRepayment(repay_data);
    this.setState({repay_data:{...repay_data, paystack_id:""}})
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
getRand = () => {
    //you can put any unique reference implementation code here
    let text = "";
    let possible = "0123456789";
    for( let i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
getRequestOpt =()=>{
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    return requestOptions
}
componentDidMount() {
  let check = checkUserStatus()
    if(check == false){
      this.setState({modal:true})
    }
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  this.fetchAllLoanApi(requestOptions);
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
  fetch(getConfig("getLoanGroupName"), requestOptions)
  .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        if(data.success == false){
          this.setState({group_name: [], isFetching:false})
        }else{
          this.setState({group_name: data, isFetching:false})
        }
    })
        .catch(error => {
        if (error === "Unauthorized") {
            this.props.timeOut()
           }
    });
    fetch(getConfig('repayment_duration'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    if(data.success == false || data.length == 0 ){
      this.setState({repayment_duration: []});
    }else{
      this.setState({repayment_duration: data});  
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
      console.log(data)
      this.setState({ loading: false, registrationFee:data});
    })
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
});
fetch(getConfig('showGuarantorTable'), requestOptions)
.then(async response => {
const data = await response.json();
if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
}
if(data.success == false){
  this.setState({tdetails: [], balance: 0, completed: [], accounts:[], loading:false })
}else{
  let newArray = [];
  let newArrays = [];
      data.forEach(d => {
        if(d.loan_status == 0){
          newArray.push(d)
        }else{
          newArrays.push(d)        }
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

fetchLoanGroupDetails=(id)=>{
  const {token} = this.state
  let requestOptions = this.getRequestOpt
  fetch(getConfig('getLoanActivities')+ id+ "?token=" + token  , requestOptions)
  .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
        this.setState({group_details: []})
    }else{
        this.setState({group_details:data})
    }
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.timeOut()
      }
  });
  fetch(getConfig('getLoanGroupMembers')+ id +"?token=" + token , requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
    if(data.success == false){
        this.setState({group_members: []})
    }else{
        this.setState({group_members:data, loading:false})
    }
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.timeOut()
      }
    this.setState({loading:false});
  });
}

fetchLoanDetails=(id)=>{
  const {token} = this.state
    let requestOptions = this.getRequestOpt
    fetch(getConfig('loanRepaymentsDetails')+ id  +"?token=" + token, requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({repayment_details: [], pagination:[]})
      }else{
        this.setState({repayment_details: data.data, pagination:data})
      }
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.timeOut()
       }
    });
    fetch(getConfig('getLoanGroupApproval')+ id +"?token=" + token, requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
        this.setState({loan_approval: [], loading:false});
      }else{
        this.setState({loan_approval: data, loading:false});
      }
    })
    .catch(error => {
       if (error === "Unauthorized") {
        this.props.timeOut();
       }
       this.setState({loading:false})
    });
}

confirmAlert=(task, id, group_id, loan_id)=>{
  const {user} = this.state
  swal({
      title: "Are you sure?",
      text: "Once you " + task + ", you will not be able to reverse your action!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
          switch(task){
              case "exit":
                  this.props.exitGroup(id);
                  if(this.props.savings){
                    swal("Loading...", {buttons: false})
                  }
                  break;
              case "join":
                  this.props.joinGroup(user.email, id)
                  if(this.props.savings){
                    swal("Loading...", {buttons: false})
                  }
                  break
              case "reject":
                  this.props.rejectGroup(id)
                  if(this.props.savings){
                    swal("Loading...", {buttons: false})
                  }
                  break
              case "accept":
                  this.props.acceptLoan(group_id, loan_id)
                  if(this.props.savings){
                    swal("Loading...", {buttons: false})
                  }
                  break
              case "decline":
                  this.props.declineLoan(group_id, loan_id);
                  if(this.props.savings){
                    swal("Loading...", {buttons: false})
                  }
                  break
              case "Resend Notification":
                this.props.resendGroupNotification(id);
                if(this.props.savings){
                  swal("Loading...", {buttons: false})
                }
                break
              default:
                  return null
          }
      } else {
        console.log("close")
      }
    });
}

fetchLoanApprovals= (id)=>{
  const {token} = this.state
  let requestOptions = this.getRequestOpt
  fetch(getConfig("getLoanGroupActivities") + id + "?token=" + token, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({loading:false})
      return Promise.reject(error);
  }
  if(data.success == false){
      this.setState({loan_activities: [], loading:false})
  }else{
      this.setState({loan_activities: data, loading:false})
  }
  
})
}

fetchAllLoanApi=(requestOptions)=>{
  fetch(getConfig("getLoanGroup"), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({loading:false})
      return Promise.reject(error);
  }
  if(data.length == 0){
      this.setState({loan_group: [], group_table: false})
  }else{
      this.setState({loan_group: data, group_table: true})
  }
})
.catch(error => {
  if (error === "Unauthorized") {
      this.props.timeOut()
    }
});

fetch(getConfig("getLoan"), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({loading:false})
      return Promise.reject(error);
  }
  if(data.success == false){
      this.setState({loan_details: []})
  }else{
      this.setState({loan_details: data})
  }
})
.catch(error => {
  if (error === "Unauthorized") {
      this.props.timeOut()
    }
});
fetch(getConfig("completedLoan"), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({loading:false})
      return Promise.reject(error);
  }
  if(data.success == false){
      this.setState({Completed: []})
  }else{
      this.setState({Completed: data})
  }
  
})
.catch(error => {
  if (error === "Unauthorized") {
      this.props.timeOut()
    }else{
      this.setState({loading:false});
  }
});
}

// value change handler
handleChange(event) {
  const { name, value, checked } = event.target;
  const { add_card } = this.state;
  if(name == "save_card"){
    this.setState({add_card:{...add_card, [name]:checked}})
  }else{
    this.setState({add_card: {...add_card, [name]: value }});
  }
  
}

fetchUsers = (search) =>{
  const {token} = this.state
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      // body: JSON.stringify(search),
  };
  fetch(getConfig('getAllUsersAutoComplete') + search +"?token=" + token, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  this.setState({users: data});
})
.catch(error => {
  if (error === "Unauthorized") {
    this.props.timeOut()
     }
  this.setState({loading:false, err : "internet error" });
  console.error('There was an error!', error);
});
}
handleIncrement = () =>{
  const {formList} = this.state
  this.setState({
    formList:[...formList, {
        user_id:"",
        guaranteed_amount:""
    },]
  })
}

handleRemove = (id) =>{
  const {formList} = this.state
  formList.splice(id, 1)
  this.setState({
    formList:formList
  })
}
//incrementation of form end
handleChangeG(event) {
  const { name, value } = event.target;
  const { group_data } = this.state;
  this.setState({
      group_data: {...group_data, [name]: value }
  });
}
handleChangeGroup(event) {
  const { name, value } = event.target;
  const { group_data } = this.state;
  this.setState({
      group_data: {...group_data, [name]: value }
  });
}
handleChangeLoans(event){
  const { name, value, checked } = event.target;
  const { data } = this.state;
  if(name == "payment_duration"){
    if ( data.loan_amount != "") {
      let repay = data.loan_amount.replace(/,/g, '') / value;
      if (data.frequency == "Weekly") {
          let week_repay = repay / 4;
          // console.log(week_repay)
          this.setState({ data: {...data, repayment_amount: week_repay, payment_duration: value } })        
      } else{
        this.setState({ data: {...data, repayment_amount: Math.round(repay), payment_duration: value } })
      }
    }
  }else if (name == "frequency"){
        if ( data.loan_amount != "" && data.payment_duration != "" ) {
          let repay = data.loan_amount.replace(/,/g, '') / data.payment_duration;
          // console.log(repay)
          console.log('Frequency: ', data.frequency);
          if (value == "Weekly") {
            repay = repay / 4;
            // console.log(repay)
            this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
            } else{
              this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
            }
        }else{
          this.setState({ data: { ...data, [name]: value} });
        }
  }else if (name == "loan_amount"){
    if ( data.payment_duration != "") {
        // if payment duration is not empty
        let repay = value.replace(/,/g, '') / data.payment_duration; // monthly repayment amount
        // console.log("Frequency: ", data.frequency);
        if (data.frequency == "Weekly") {
          // if frequency is weekly
          repay = repay / 4; // weekly repayment amount
          // console.log("Weekly repayment", repay)
          this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })        
        } else{
          this.setState({ data: {...data, repayment_amount: Math.round(repay), [name]: value } })
        }
        // console.log('repayment amount: ', repay);
    }else{
      this.setState({ data: { ...data, [name]: value.replace(/,/g, '')} });
    }
  }else{
    this.setState({data:{...data, [name]:value}})
  }
}
handleChangeRepay(event) {
  const { name, value, checked } = event.target;
  const { repay_data, loan_bal } = this.state;
  if(name == "save_card"){
    this.setState({repay_data:{...repay_data, [name]:checked}})
  }else{
    this.setState({repay_data: {...repay_data, [name]: value}});
  }
  if(name =="repayment_amount" && value > loan_bal){
      swal(`${"Repaid Amount is more than your remaining balance"}`);
  }
}

handleChangeReplace(event) {
  const { name, value } = event.target;
  const { replace_data } = this.state;
  this.setState({ replace_data: { ...replace_data, [name]: value } });
  
}
// form submit handler
handleSubmitGroup(event) {
  event.preventDefault();
  const { group_data } = this.state;
  if (group_data.name2 && group_data.email2 && group_data.name3 && group_data.email3 && group_data.name4 && group_data.email4 && group_data.name5 && group_data.email5 &&group_data.group_name && group_data.group_id) {
      this.props.createLoanGroup(group_data);
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
handleSubmitLoan(event) {
  event.preventDefault();
  const {data, formList} = this.state
    let dat = {first:[data], data: formList};
    console.log(dat)
    this.props.createLoan(dat)
}
handleSubmitRepay(event) {
  event.preventDefault();
  const { repay_data } = this.state;
  if (repay_data.trans_date && repay_data.repayment_amount) {
      this.props.addLoanRepayment(repay_data);     
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
handleSubmitReplace(event) {
  event.preventDefault();
  const { replace_data } = this.state;
  if (replace_data.name && replace_data.email) {
      if(replace_data.id == 0){
        swal({
          title: "Are you sure?",
          text: "You are about to replace this invite",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.props.replaceMember(replace_data);
        }})
      }else{
        swal({
          title: "Are you sure?",
          text: "You are about to replace Member",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            this.props.removeMember(replace_data);
        }
      })
    }
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}
// modal open handler
handleQuickSave = () => {
  this.setState({showSave: true});
}
// handleModal = () => {
//   this.setState({modal: true});
// }
modalClose() {
  this.setState({modal:false});
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
handleCreateReplace = (request_id, id) => {
  const {replace_data} =this.state
  this.setState({showReplace: true, request_id, code:id, replace_data:{...replace_data, id:id, request_id:request_id}});
}
handleCreateLoan = () => {
  this.setState({showLoan: true});
}
handleShowAction = (group_id, request_id, code, group_member_status, group_request_status) => {
  this.setState({showAction:true, group_id, request_id, code, group_member_status, group_request_status })
}
handleCreateGroup = () => {
  this.setState({showGroup: true});
}
handleCreateManage = (id) => {
  this.setState({loading:true});
  const {token} =this.state
  fetch(getConfig('getLoanGroupDetails')+ id + "?token="+token, this.getRequestOpt)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      if(data.success == false){
          this.setState({manage_details: [], loading:false})
      }else{
          this.setState({manage_details:data, loading:false})
      }
  })
  .catch(error => {
    if (error === "Unauthorized") {
        this.props.timeOut()
      }
  });
  this.setState({showManage: true});
}
handleCreateDetails = (id) => {
  this.setState({loading: true});
  this.fetchLoanGroupDetails(id)
  this.setState({showDetails: true});
}
handleCreateRepayment = (id) => {
  this.setState({loading: true});
  const {repay_data, token} = this.state
  fetch(getConfig("loanBalance")+id + "?token="+token, this.getRequestOpt)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      this.setState({loan_bal: data})
  })
  .catch(error => {
    if (error === "Unauthorized") {
        this.props.timeOut()
      }
  });
  this.setState({showrepayment: true, repay_data: {...repay_data, id: id} });
}
handleCreateManageLoan = (id) => {
  this.setState({loading:true})
  this.fetchLoanDetails(id)
  this.setState({showManageLoan: true});
}
handleShowApproval=(group_id)=>{
  this.setState({loading:true})
  this.fetchLoanApprovals(group_id)
  this.setState({showLoanApproval: true});
}
// modal close handler
handleClose() {
  this.setState({showSave:false});
}
handleCloseApproval() {
  this.setState({showLoanApproval:false});
}
handleCloseReplace() {
  this.setState({showReplace:false});
}
handleCloseLoan() {
  this.setState({showLoan:false});
}
handleCloseAction() {
  this.setState({showAction:false});
}
handleCloseGroup() {
  this.setState({showGroup:false});
}
handleCloseManage() {
  this.setState({showManage:false});
}
handleCloseDetails() {
  this.setState({showDetails:false});
}
handleCloseRepayment() {
  this.setState({showrepayment:false});
}
handleCloseManageLoan() {
  this.setState({showManageLoan:false});
}
// tab handler
ongoingTab() {
  this.setState({tab:0});
}
completeTab(){
  this.setState({tab:1});
}
approvalTab(){
  this.setState({tab:2});
}
handleChangeUsers = (event, values, id) =>{
  const {name, value } = event.target;
    const { formList, users } = this.state;
    let newArray = [...formList];
    console.log(id)
  this.fetchUsers(value);
  users.forEach(user => {
    if(values == (user.first_name + " " + user.last_name) +" "+ user.email){
      const elementsIndex = formList.findIndex((element,index) => index == id )
      newArray[elementsIndex] = {...newArray[elementsIndex], user_id: user.id}
      console.log(newArray)
    }
  });
  this.setState({formList: newArray});
}
handleDaChange(event, id) {
  const { name, value } = event.target;
  const { formList} = this.state;
  const elementsIndex = formList.findIndex((element,index) => index == id )
  let newArray = [...formList]
  newArray[elementsIndex] = {...newArray[elementsIndex], [name]: value }
  console.log(newArray)
  this.setState({formList: newArray});
}
render(){
  const {users, tdetails, repayment_duration, repayment_details, loan_approval, add_card, id, formList, index, showSave, cards, loan_activities,
     Completed, replace_data, isFetching, tab, showLoan, showReplace, showApproval, showLoanApproval, showManage,
      showGroup, group_table, group_id, request_id, code, group_request_status, group_member_status, showAction, 
      group_name, loan_group, manage_details, loan_details, data, group_data, showDetails, modal, showManageLoan, 
      modalForm, loan_avail_amount, registrationFee, modalFee, group_members, group_details, loading, repay_data} = this.state
  
      let arr = []
      for (let index = 0; index < repayment_duration; index++) {
        arr.push((index)+1);    
      };
      const bal = data.loan_amount - loan_avail_amount
      return (
    <div className="m-sm-30">
     { modal == false ?
     <div>
       <div className="mb-sm-30">
         <Breadcrumb
           routeSegments={[
             { name: "Loan" }
           ]}
         />
       </div>
       {isFetching ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading/>
        </div>:
        <div className="pb-2 pt-7 px-8 " style={{background:"#222943"}}>      
          <Grid container spacing={3} className="mb-3">
            <Grid item xs={12} sm={6} md={6}>
                <Card className="play-card p-sm-24" style={{backgroundColor:"#1999ff",height:171}} elevation={6}>
                    <div className="flex items-cente p-3">
                    <Icon style={{fontSize: "44px", opacity: 0.6, color: "#fff"}}>track_changes</Icon>
                    <div className="ml-3">
                        <Typography className="text-white" variant="text-16">Guarantable Amount</Typography>
                        <h6 className="m-0 mt-1 text-white text-22"> {numberFormat(loan_avail_amount)} </h6>
                    </div>
                    </div>
                </Card>
            </Grid>
            <Grid item lg={6} md={6} xs={12} sm={6}>
              <div className="flex items-cente">
                      <CustomCarousel />
              </div>
            </Grid> 
              <Grid item lg={5} md={12} sm={12} xs={12}>
                <Button className="uppercase"
                  size="large"
                  variant="contained"
                  style={{backgroundColor:"#1999ff", color:"white"}}
                  onClick={this.handleCreateGroup}>
                   Create Group
                </Button>
                <Button className="uppercase"
                  size="large"
                  variant="outlined"
                  style={{backgroundColor:"#04956a",color:"white"}}
                  onClick={this.handleCreateLoan}>
                   Request Loan
                </Button>
              </Grid>
        </Grid>
        </div>         
      }
        <CustomTab  tdetails={tdetails}/>
      <AddCardDialog callback={this.callback} showSave={showSave} 
        handleClose={this.handleClose} add_card={add_card} />
    </div>:
  <></>}


    {/* Quick Loan Dialog Start */}
    <Dialog
      open={showLoan}
      onClose={this.handleCloseLoan}
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color="primary"      
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseLoan}
            aria-label="Close"
          >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Create Loan Request
          </Typography>
        </Toolbar>
      </AppBar>
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmitLoan}
        onError={errors => null}>
        <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <NumberFormat
                    value={data.loan_amount}
                    thousandSeparator={true} 
                      // prefix={'₦'}
                    label="Loan Amount"
                    name="loan_amount"
                    className="mb-4 w-full"
                    onChange={this.handleChangeLoans}
                    customInput={TextValidator}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  {/* <TextValidator
                  className="mb-4 w-full"
                  label="Loan Amount"
                  onChange={this.handleChangeLoans}
                  type="number"
                  name="loan_amount"
                  value={data.loan_amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />                 */}
                  <TextField
                    className="mb-4 w-full"
                    select
                    label="Select Loan Duration"
                    name="payment_duration"
                    value={data.payment_duration}
                    onChange={this.handleChangeLoans}
                    //  helperText="Please select Loan Group"
                  >
                      <MenuItem value={""}>Select Loan Duration</MenuItem>
                    {arr.map((name, index) => (
                      <MenuItem value={name}>{(name) +" "+ 'month'}</MenuItem>
                    ))}
                  </TextField>
                <TextField
                className="mb-4 w-full"
                  select
                  label="Select Frequency"
                  name="frequency"
                  value={data.frequency}
                  onChange={this.handleChangeLoans}
                  // helperText="Please select frequency"
                >
                    <MenuItem value={""}>Select Frequency</MenuItem>
                    <MenuItem value={"Weekly"}> Weekly</MenuItem>
                    <MenuItem value={"Monthly"}> Monthly </MenuItem>
                </TextField>
                {/* {data.loan_amount && data.frequency && data.payment_duration &&
                <TextValidator
                  className="mb-4 w-full"
                  label={data.frequency? data.frequency +" Repayment Amount": "Frequent Repayment" +" Amount"}
                  onChange={this.handleChangeLoans}
                  type="number"
                  name="repayment_amount"
                  value={data.repayment_amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />} */}
                 {data.loan_amount && data.frequency && data.payment_duration &&
                  <NumberFormat
                      value={data.repayment_amount}
                      thousandSeparator={true} 
                        // prefix={'₦'}
                      label={data.frequency? data.frequency +" Repayment Amount": "Frequent Repayment" +" Amount"}
                      name="repayment_amount"
                      className="mb-4 w-full"
                      onChange={this.handleChangeLoans}
                      customInput={TextValidator}
                      validators={[
                        "required"
                      ]}
                      errorMessages={["this field is required"]}
                  />}
                {data.loan_amount && data.frequency &&
                  <TextValidator
                  className="mb-4 w-full"
                  onChange={this.handleChangeLoans}
                  type="date"
                  name="start_date"
                  helperText="Start Date"
                  value={data.start_date}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />}
                {/* <TextValidator
                  className="mb-4 w-full"
                  onChange={this.handleChangeLoans}
                  type="date"
                  name="end_date"
                  helperText="End Date"
                  value={data.end_date}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                /> */}
                <TextField
                 className="mb-4 w-full"
                 select
                 label="Select Loan Guarantor"
                 name="loan_group"
                 value={data.loan_group}
                 onChange={this.handleChangeLoans}
                //  helperText="Please select Loan Guarantor"
             >
               <MenuItem value={"Member"}>Member</MenuItem>
               <MenuItem value={"Loan Group"}> Loan Group</MenuItem>
             </TextField>
             {data.loan_group == "Loan Group" &&
               <TextField
                 className="mb-4 w-full"
                 select
                 label="Select Loan Group"
                 name="loan_group"
                 value={data.loan_group}
                 onChange={this.handleChangeLoans}
                //  helperText="Please select Loan Group"
               >
                   <MenuItem value={""}>Select Loan Group</MenuItem>
                 {group_name.map((name, index) => (
                   <MenuItem value={name.group_name}>{name.group_name}</MenuItem>
                 ))}
               </TextField>
             }
             {data.loan_group == "Member" &&
            
               <Grid container spacing={2}>
               {formList.map((dat, index)=>(
               <> 
               <Grid item lg={5} md={5} sm={5} xs={5}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                onChange={(event, value) => this.handleChangeUsers(event, value, index)}
                options={users.map((option) => (option.first_name + " " + option.last_name)+" "+(option.email))}
                renderInput={(params) => (
                  <TextValidator
                    {...params}
                    onChange={(event, value) => this.handleChangeUsers(event, value, index)}
                    label="Search users"
                    className="mb-1 w-full"
                    // helperText="Search users"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            </Grid>
            <Grid item lg={5} md={5} sm={5} xs={5}>
                <TextValidator
                  // fullWidth
                  // margin="normal"
                  helperText={"Enter amount value " + bal}
                  label="Guarantee Amount"
                  name="guaranteed_amount"
                  onChange={(e)=>this.handleDaChange(e, index)}
                  value={dat.guaranteed_amount}
                  type="number"
                  className="mb-1 w-full"
                  validators={[
                      "required"
                    ]}
                />
            </Grid>
            <Grid item lg={2} md={2} sm={2} xs={2}>
              {index != 0 &&<Button margin="normal" type="button" variant="contained" 
              style={{background:"red",color:"white"}} onClick={()=>this.handleRemove(index)} >Remove</Button>}
            </Grid>
               </>))}                          
               <Button variant="contained" className="mb-4" type="button" style={{background:"blue",color:"white"}} 
               onClick={this.handleIncrement} >Add More Guarantor</Button>
              </Grid>
             }
            
                <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography>Choose Card</Typography>
                <PayCard cards={cards} id={id} value={data.card_id} open={this.handleQuickSave} handleChange={this.handleChangeLoans}/>
                </Grid>

                {this.props.savings && data.card_id &&
                <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <Button className="uppercase"
                    type="submit"
                    size="large"
                    variant="contained"
                    color='primary'
                  style={{color:"white"}}>Apply Loan</Button>
                
              </Grid>
            </Grid>
          </Card>
      </ValidatorForm>
    </Dialog>
    {/* Quick Loan Dialog End */}

    {/* Loan group Dialog Start */}
    <Dialog
      open={showGroup}
      onClose={this.handleCloseGroup}      
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color="primary"      
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseGroup}
            aria-label="Close"
          >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Create Group
          </Typography>
        </Toolbar>
      </AppBar>
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmitGroup}
        onError={errors => null}>
      <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="mb-4 w-full"
                label="Enter Group Name"
                onChange={this.handleChangeGroup}
                type="text"
                name="group_name"
                value={group_data.group_name}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              </Grid>
            <Grid container spacing={2} item lg={12} md={12} sm={12} xs={12}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Member 2 Name"
                  onChange={this.handleChangeGroup}
                  type="text"
                  name="name2"
                  value={group_data.name2}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Member 2 email"
                  onChange={this.handleChangeGroup}
                  type="text"
                  value={group_data.email2}
                  name="email2"
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} item lg={12} md={12} sm={12} xs={12}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Member 3 Name"
                    onChange={this.handleChangeGroup}
                    type="text"
                    name="name3"
                    value={group_data.name3}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Member 3 email"
                    onChange={this.handleChangeGroup}
                    type="text"
                    value={group_data.email3}
                    name="email3"
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
              </Grid>
            <Grid container spacing={2} item lg={12} md={12} sm={12} xs={12}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Member 4 Name"
                  onChange={this.handleChangeGroup}
                  type="text"
                  name="name4"
                  value={group_data.name4}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Member 4 email"
                  onChange={this.handleChangeGroup}
                  type="text"
                  value={group_data.email4}
                  name="email4"
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} item lg={12} md={12} sm={12} xs={12}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Member 5 Name"
                  onChange={this.handleChangeGroup}
                  type="text"
                  name="name5"
                  value={group_data.name5}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                  <TextValidator
                    className="mb-4 w-full"
                    label="Member 5 email"
                    onChange={this.handleChangeGroup}
                    type="text"
                    value={group_data.email5}
                    name="email5"
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
              </Grid>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {this.props.savings &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#04956a", color:"white", width:"100%"}}>Create Loan Group</Button>
            </Grid>
          </Grid>
        </Card>
      </ValidatorForm>
    </Dialog>
    {/* Loan group Dialog End */}

    {/* Manage Group Dialog Start */}
    <Dialog
      open={showManage}
      onClose={this.handleCloseManage} 
      scroll="body"
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseManage}
            aria-label="Close"
          >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Manage Group
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {loading ?
            <Typography>Loading...</Typography>:
            <>
            <Typography variant="h6" className="font-bold text-green" >Group Members</Typography>
            
            <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
            {manage_details.map((dat, index) => (
              <ManageLoanCard
              name={dat.name}
              status={dat.status}
              resend_notif={()=>this.confirmAlert("Resend Notification", dat.request_id, 0, 0)} 
              replace_member={()=>this.handleCreateReplace(dat.request_id, dat.id)} 
              replace_invite={()=>this.handleCreateReplace( dat.request_id, 0)}/>
              ))}
            </div>
            </>
            }
          </Grid>
        </Grid>
      </Card>
    </Dialog>
    {/* Manage Group Dialog End */}

    {/* Loan Group Details Dialog Start */}
    <Dialog
      open={showDetails}
      onClose={this.handleCloseDetails} 
      scroll="body"
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseDetails}
            aria-label="Close"
          >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Group Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {loading ?
            <Typography>Loading...</Typography>:
            <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid",     borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
              <LoanGroupDetailsCard data={group_details} members={group_members} />
            </div>
            }
          </Grid>
        </Grid>
      </Card>
    </Dialog>
    {/* Loan Group Details Dialog End */}

      {/* Loan repayment Dialog Start */}
      <Dialog
          open={modal}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseRepayment} 
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseRepayment}
                aria-label="Close"
              >
                {/* <CloseIcon style={{color:"#fff"}} /> */}
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
                      <Link to="/#">
                          <Button className="uppercase"
                              size="small"
                              variant="outlined">
                                  Continue Business
                          </Button> 
                        </Link>
                      </Grid>
                      <Grid item lg={4} md={4} sm={4} xs={12}>                  
                       <Link to="/product_financing"> <Button className="uppercase"
                            size="small"
                            variant="outlined">
                            Continue Shopping
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
                {/* <CloseIcon style={{color:"#fff"}} /> */}
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
          open={modalFee}
          fullWidth={true}
          maxWidth={"sm"}
          onClose={this.handleCloseModalFee} 
          TransitionComponent={Transition}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <AppBar style={{position: "relative"}} color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleCloseModalFee}
                aria-label="Close"
              >
                {/* <CloseIcon style={{color:"#fff"}} /> */}
              </IconButton>
              <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
                Welcome To SESIS
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-1 pt-2 pb-4">
              <Grid item lg={12} md={12} sm={12} xs={12}>
               <ModalForm />
              </Grid>
                </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}

    {/* Replace or Invite new Member Dialog Start */}
    <Dialog
      open={showReplace}
      onClose={this.handleCloseReplace} 
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color='primary'>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseReplace}
            aria-label="Close" >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            {code == 0? "Replace Invite":"Replace Member "} 
          </Typography>
        </Toolbar>
      </AppBar>
      <ValidatorForm
        ref="form"
        onSubmit={this.handleSubmitReplace}
        onError={errors => null}>
        <Card className="px-6 pt-2 pb-4">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                className="mb-4 w-full"
                label="Member Name"
                onChange={this.handleChangeReplace}
                type="text"
                value={replace_data.name}
                name="name"
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="mb-4 w-full"
                label="Member Email"
                onChange={this.handleChangeReplace}
                type="email"
                value={replace_data.email}
                name="email"
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
                style={{backgroundColor:"#04956a", color:"white"}}>
                  {code == 0? "Replace Invite":"Replace Member "} 
              </Button>
            </Grid>
          </Grid>
        </Card>
      </ValidatorForm>
    </Dialog>
    {/* Replace or Invite new Member Dialog End */}

    {/* Loan Manage Dialog Start */}
    <Dialog
      open={showManageLoan}
      onClose={this.handleCloseManageLoan}
      scroll="body"
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}}
      color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseManageLoan}
            aria-label="Close">
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Loan Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {loading ?
            <Typography>Loading...</Typography>:
            <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid",     borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
              <LoanDetailsCard 
              data={loan_approval} 
              approvals={repayment_details} 
              resend_notif={()=>this.confirmAlert("Resend Loan Notification", 0, data.loan_group, data.user_id)} />
            </div>
            }
          </Grid>
        </Grid>
      </Card>
    </Dialog>
    {/* Loan Manage Dialog End */}

    {/* Show Group Action Dialog Start */}
    <Dialog onClose={this.handleCloseAction} 
    aria-labelledby="simple-dialog-title" open={showAction}
    TransitionComponent={Transition}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}} color='primary'>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseAction}
            aria-label="Close"
          >
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Actions
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <DialogTitle id="simple-dialog-title"></DialogTitle> */}
      <List>
          {group_request_status != 1 && <>
          <ListItem button onClick={()=>this.confirmAlert("join", code, 0, 0)}>
            <ListItemAvatar>
              <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                <DoneAll />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Join Group" />
          </ListItem>
          <ListItem button onClick={()=>this.confirmAlert("reject", request_id, 0, 0)}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600]}}>
                <CloseIcon style={{color:"#fff"}} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Reject Group" />
          </ListItem>
          </>}
          {(group_member_status != 0) && (group_member_status != null)  &&
          <ListItem button onClick={()=>this.confirmAlert("exit", group_id, 0, 0)}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600]}}>
                <ExitToApp />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Exit Group" />
          </ListItem>}
      </List>
    </Dialog>
    {/* Show Group Action Dialog End */}

    {/* Loan Approval Dialog Start */}
    <Dialog
      open={showLoanApproval}
      onClose={this.handleCloseApproval}
      scroll="body"
      TransitionComponent={Transition}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <AppBar style={{position: "relative"}} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={this.handleCloseApproval}
            aria-label="Close">
            <CloseIcon style={{color:"#fff"}} />
          </IconButton>
          <Typography variant="h6" className="text-white" style={{ flex: 1, color:"#fff"}}>
            Loan Approvals
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className="px-6 pt-2 pb-4">
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {loading ?
            <Typography>Loading...</Typography>:
            <div className="pb-5 pt-5 px-2 bg-default" style={{border:1, borderStyle:"solid",     borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
               { loan_activities.length == 0?
                 <Typography variant="p" className="font-bold">You currently do not have any loan that require your approval</Typography>:
                loan_activities.map((data, index) =>(
                 <LoanApprovalCard key={index} data={data}
                 accept={()=>this.confirmAlert("accept", 0, data.loan_group, data.loan_id)} 
                 decline={()=>this.confirmAlert("decline", 0, data.loan_group, data.loan_id)}/>
               ))}
            </div>
            }
          </Grid>
        </Grid>
      </Card>
    </Dialog>
    {/* Loan Approval Dialog End */}
    </div>
  );
}
}
// export default Regular;
const actionCreators = {
  timeOut: userActions.timeOut,
  createLoanGroup: userActions.createLoanGroup,
  createLoan: userActions.createLoan,
  acceptLoan: userActions.acceptLoan,
  declineLoan: userActions.declineLoan,
  rejectGroup: userActions.rejectGroup,
  joinGroup: userActions.joinGroup,
  exitGroup: userActions.exitGroup,
  addLoanRepayment: userActions.addLoanRepayment,
  replaceMember: userActions.replaceMember,
  removeMember: userActions.removeMember,
  resendGroupNotification: userActions.resendGroupNotification,
  resendLoanNotification: userActions.resendLoanNotification,
  saveWallet: userActions.saveWallet
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Loan))
);