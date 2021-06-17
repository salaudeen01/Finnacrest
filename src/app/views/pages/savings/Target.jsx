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
import TargetTransactionCard from "./components/TargetTransactionCards";
import TableCard from "./components/TableCard";
import PayOption from "app/views/dashboard/shared/PayOption";
import Loading from "matx/components/MatxLoading/MatxLoading";
import PayCard from "app/views/dashboard/shared/PayCard";
import AddCardDialog from "app/views/dashboard/shared/AddCardDialog";
import NumberFormat from "react-number-format";
import ShareholdingFee from "../Shareholdings/ShareholdingFee";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
          card_id:"",
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
        tar_amt:0,
        isButtonDisabled:false,
        bal_amt:0,
        shareMinFee:"",
        share_balance:"",
        shareFee:false,
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
        this.handleShareOpen = this.handleShareOpen.bind(this);
        this.handleShareClose = this.handleShareClose.bind(this);
        this.handleCloseQuickSave = this.handleCloseQuickSave.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFund = this.handleSubmitFund.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.fetch_next_page = this.fetch_next_page.bind(this);
        this.fetch_page = this.fetch_page.bind(this);
        this.fetch_prev_page = this.fetch_prev_page.bind(this);
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
      console.log(data)
      if(data.success === false && data.length === 0){
        this.setState({tdetails: [], balance: 0, completed: [], accounts:[], loading:false })
      }else{
        // console.log(data)
        this.setState({tdetails: data[1], completed: data[2], balance: data[0], loading:false })
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
  }console.log(data)
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

fetch_next_page = ()=>{
  const {pagination} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(pagination.next_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    // console.log(data)
    if(data.success == false){
      this.setState({singleTargetTransaction: [], loading:false });
    }else{
      this.setState({singleTargetTransaction: data.data, pagination:data, loading:false });
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
    this.setState({ loading: false, singleTargetTransaction:data.data, pagination:data });
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
    this.setState({ loading: false, singleTargetTransaction:data.data, pagination:data });
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
    this.setState({ loading: false, singleTargetTransaction:data.data, pagination:data });
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
  if (edit_data.amount && edit_data.frequency && edit_data.start_date && edit_data.card_id && edit_data.end_date  && edit_data.payment_method) {
      this.props.editTargetSavings(edit_data);
      // console.log(edit_data)
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
    // console.log(data)
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
      this.setState({
        isButtonDisabled: true
      });
      // console.log(fund_data)
  }else{
      swal(
          `${"All fields are required"}`
      );
  }
}

// data change handler
// handleChange = event => {
//   const {data} = this.state
//   const {name, value, checked} = event.target
//   if(name == "id"){
//     this.setState({id:checked})
//   }else if(name == "amount" || name == "targeted_amount"){
//   this.setState({data:{...data, [name]:value.replace(/,/g, '')}})
//   }else{
//     this.setState({data:{...data, [name]:value}}) 
//   }
// };

handleChange = event => {
  const {data} = this.state
  const {name, value, checked} = event.target
  if(name === "id"){
    this.setState({id:checked})
  }else if(name === "start_date"){
    var currentDate = new Date(value);
    let freq = Math.round(data.targeted_amount.replace(/,/g, '')  / data.amount.replace(/,/g, '') ); 
    if(data.frequency === "Daily"){
        let raw = currentDate.setDate(currentDate.getDate()+freq);
        let end_date = new Date(raw);
        let mn = end_date.getMonth()+1;
        let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
        let month = mn <10 ? "0"+mn : mn;
        let date = end_date.getFullYear() +'-'+month+'-'+ day;
        this.setState({ data: {...data, end_date: date, start_date: value } })
    }else if(data.frequency === "Weekly"){
        let weeks = freq * 7;
        let raw = currentDate.setDate(currentDate.getDate()+weeks);
        let end_date = new Date(raw);
        let mn = end_date.getMonth()+1;
        let day = end_date.getDate() < 10 ? "0"+ end_date.getDate():end_date.getDate();
        let month = mn < 10 ? "0"+mn : mn;
        let date = end_date.getFullYear() +'-'+month+'-'+ day;
        this.setState({ data: {...data, end_date: date, start_date: value } })
    }else{
        let raw = currentDate.setMonth(currentDate.getMonth()+freq);
        let end_date = new Date(raw);
        let mn = end_date.getMonth()+1;
        let day = end_date.getDate() < 10 ? "0"+ end_date.getDate():end_date.getDate();
        let month = mn < 10 ? "0"+mn : mn;
        let date = end_date.getFullYear() +'-'+month+'-'+ day;
        this.setState({ data: {...data, end_date: date, start_date: value } })
    }
  }else if(name === "frequency"){
    if(data.start_date !== "" && data.amount !== "" && data.targeted_amount !== ""){
        var currentDate = new Date(data.start_date);
        let freq = Math.round(data.targeted_amount.replace(/,/g, '')  / data.amount.replace(/,/g, '') );
        if(value === "Daily"){
            let raw = currentDate.setDate(currentDate.getDate()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else if(value === "Weekly"){
            let weeks = freq * 7;
            let raw = currentDate.setDate(currentDate.getDate()+weeks);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else{
            let raw = currentDate.setMonth(currentDate.getMonth()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value } })
        }
    }else{
        this.setState({ data: { ...data, [name]: value} });
    }
  }else if(name === "amount"){
    if(data.targeted_amount !== "" && data.start_date !== "" && data.frequency !== ""){
        var currentDate = new Date(data.start_date);
        let freq = Math.round(data.targeted_amount / value);
        if(data.frequency === "Daily"){
            let raw = currentDate.setDate(currentDate.getDate()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else if(data.frequency === "Weekly"){
            let weeks = freq * 7;
            let raw = currentDate.setDate(currentDate.getDate()+weeks);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else{
            let raw = currentDate.setMonth(currentDate.getMonth()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value } })
        }
    }else{
        this.setState({ data: { ...data, [name]: value,} });
    }
  }else if(name === "targeted_amount"){
    if(data.amount !== "" && data.start_date !== "" && data.frequency !== ""){
        var currentDate = new Date(data.start_date);
        let freq = Math.round(value / data.amount);
        if(data.frequency === "Daily"){
            let raw = currentDate.setDate(currentDate.getDate()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else if(data.frequency === "Weekly"){
            let weeks = freq * 7;
            let raw = currentDate.setDate(currentDate.getDate()+weeks);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value} })
        }else{
            let raw = currentDate.setMonth(currentDate.getMonth()+freq);
            let end_date = new Date(raw);
            let mn = end_date.getMonth()+1;
            let day = end_date.getDate() < 10 ? "0"+ end_date.getDate() : end_date.getDate();
            let month = mn <10 ? "0"+mn : mn;
            let date = end_date.getFullYear() +'-'+month+'-'+ day;
            this.setState({ data: {...data, end_date: date, [name]:value } })
        }
    }else{
        this.setState({ data: { ...data, [name]: value.replace(/,/g, '') ,} });
    }
  }else{
    this.setState({data:{...data, [name]:value}})
  }
};

handleChangeEdit = event => {
  const {edit_data} = this.state
  const {name, value, checked} = event.target
  if(name == "id"){
    this.setState({id:checked})
  }else if(name == "amount"){
    this.setState({edit_data:{...edit_data, [name]:value.replace(/,/g, '')}})
    }else{
  this.setState({edit_data:{...edit_data, [name]:value}})
  }
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
handleShareOpen() {
  this.setState({shareFee:true});
}
handleShareClose() {
  this.setState({shareFee:false});
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
    const {balance, tdetails, bal_amt,isButtonDisabled, tar_amt, share_balance, shareFee, shareMinFee, loading, isLoading, tab, cards, add_card, showSaveCard, id, auto_save, edit_data, singleTargetTransaction, showEdit, showView, completed, email, bank_details, fund_data,  autoSave, accounts, showSave,showWithdraw, data, pagination, show, savings} = this.state
    const bal = tar_amt - bal_amt
    // console.log(completed)
    return (
      <div className="m-sm-10">
        {loading ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <>
        <Grid container spacing={2} className="pb-5 pt-7 px-2 bg-default">
               <Grid item lg={6} md={6} sm={12} xs={12} >
                  {share_balance < shareMinFee ?
                      <Button className="uppercase"
                        size="small"
                        variant="contained"
                        style={{backgroundColor:"#222943", color:"white"}}
                        onClick={this.handleShareOpen}>
                         Create Target
                    </Button>:
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                    {tdetails.length != 0 && <Button className="uppercase"
                      size="small"
                      variant="contained"
                      style={{backgroundColor:"#222943", color:"#fff"}}
                      onClick={this.handleQuickSave}>
                      Quick Save
                    </Button>}
                    <Button className="uppercase"
                      size="small"
                      variant="contained"
                      style={{ backgroundColor:"#222943", color:"#fff"}}
                      onClick={this.handleAutoSave}>
                        Create Target
                    </Button>
                 </ ButtonGroup> }
              </Grid>
            </Grid>
    <div className="pb-5 pt-7 px-2 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#222943",borderRadius:8}}>  
    <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button size="small"
                variant={tab? "contained" : "outlined"}
                style={{backgroundColor: tab ? "#222943":"", color: tab ? 'white':""}}
                onClick={this.ongoingTab}
                >Ongoing</Button>
            <Button 
                size="small"
                variant={tab? "outlined" : "contained"}
                style={{backgroundColor: tab ? "":"#222943", color: tab ? "":"white"}}
                onClick={this.completeTab}
                >Completed</Button>
          </ButtonGroup>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            {tab &&
              <div className="px-2 bg-default" >
                {tdetails.length != 0?
                tdetails.map((data, index)=>(
                  <TargetTransactionCard key={index} status={false} 
                  withdrawStatus={data.withdraw_status} amount={data.targeted_amount===null?numberFormat(0): numberFormat(data.targeted_amount)} 
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
              <div className="px-2 bg-default">
                {completed.length !== 0?                
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
                <Typography variant="body1">No Completed Target Savings</Typography> }               
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
                    helperText={"Remaining amount to complete plan is" + bal}
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
                      <PayOption callback={this.callback} type={'02'} targetId={"00"} amount={fund_data.amount}/>
                    }
                </Grid>} 
                {/* <Grid item lg={12} md={12} sm={12} xs={12}> */}
                  <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
                      {this.props.savings.savings &&
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                  </div>      
                {/* </Grid> */}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                {(fund_data.payment_method == "Wallet" || (fund_data.card_id !="0" && fund_data.card_id !="")) && 
                <Button className="uppercase"
                  type="submit"
                  disabled={isButtonDisabled}
                  size="large"
                  onClick={this.handleSubmitFund}
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

        {/* Create Dialog start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        scroll="body"
        open={show}
        onClose={this.handleClose}>
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
              {/* <TextValidator
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
              /> */}
              <NumberFormat
                  value={data.targeted_amount}
                  thousandSeparator={true} 
                  label="Overall Targeted Amount"
                  name="targeted_amount"
                  className="mb-4 w-full"
                  onChange={this.handleChange}
                  customInput={TextValidator}
                />
              <NumberFormat
                  value={data.amount}
                  thousandSeparator={true} 
                  label="Frequent Savings Amount"
                  name="amount"
                  className="mb-4 w-full"
                  onChange={this.handleChange}
                  customInput={TextValidator}
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
                label="Select Transaction Day"
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
                helperText="Start Date"
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
                helperText="End Date"
                value={data.end_date}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <div style={{float:'right'}}>
              <Typography>Choose Card</Typography>
               <PayCard cards={cards} id={id} value={data.card_id} open={this.handleSaveCard} handleChange={this.handleChange}/>
               </div>
               </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
              {this.props.savings.savings && data.card_id &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }</div>
              </Grid>
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#222943", color:"white"}}>Create Target Plan</Button>
              </ValidatorForm>
            </Grid>
          </Grid>
        </Card>
      </Dialog>
        {/* Create dialog end */}
        
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
              <NumberFormat
                  value={edit_data.targeted_amount}
                  thousandSeparator={true} 
                  label="Overall Targeted Amount"
                  name="targeted_amount"
                  className="mb-4 w-full"
                  onChange={this.handleChangeEdit}
                  customInput={TextValidator}
                />
              <NumberFormat
                  value={edit_data.amount}
                  thousandSeparator={true} 
                  label="Frequent Savings Amount"
                  name="amount"
                  className="mb-4 w-full"
                  onChange={this.handleChangeEdit}
                  customInput={TextValidator}
                />
               {/* <TextValidator
                className="mb-4 w-full"
                label="Overall Targeted Amount"
                onChange={this.handleChange}
                type="number"
                name="targeted_amount"
                value={edit_data.targeted_amount}
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
                value={edit_data.amount}
                validators={[
                  "required"
                ]}
                errorMessages={["this field is required"]}
              />              */}
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
                label="Select Transaction Day"
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
             <Typography>Choose Card</Typography>
             <Grid item lg={12} md={12} sm={12} xs={12}>
              <PayCard cards={cards} id={id} value={edit_data.card_id} open={this.handleSaveCard} handleChange={this.handleChangeEdit}/>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
              <div style={{textAlign:'center', alignItems:'center',alignContent:'center'}}>
              {this.props.savings.savings && edit_data.card_id &&
               <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }</div>
              </Grid>
              <Button className="uppercase"
                  type="submit"
                  size="large"
                  variant="contained"
                 style={{backgroundColor:"#222943", color:"white"}}>Update</Button>
            </ValidatorForm>
          }
        </Card>
        </Dialog>
        {/* Edit dialog end */}

        {/* View Dialog start */}
        <Dialog
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={showView}
          onClose={this.handleCloseView}
        >
            <AppBar style={{position: "relative",}} color='primary'>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={this.handleCloseView}
                  aria-label="Close"
                >
                  <CloseIcon style={{color:'#fff'}}/>
                </IconButton>
                <Typography variant="h6" className="text-white"  style={{marginLeft: theme.spacing(2), flex: 1, color:"white"}}>
                  Target Savings Transactions
                </Typography>                
              </Toolbar>
            </AppBar>
            <Card className="px-6 pt-2 pb-4">
            <Grid container spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {isLoading ?
                <Typography>Loading...</Typography>:
                <TableCard transactions={singleTargetTransaction} pagination={pagination}
                  fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page}
                  fetch_prev_page={this.fetch_prev_page}
                 />
                }
              </Grid>
            </Grid>
          </Card>
        </Dialog>
        {/* View dialog end */}
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
                  A minimum of {numberFormat(shareMinFee)} is required in your Shareholding before you can create a Target 
                </Typography>             
               <ShareholdingFee />
              </Grid>
            </Card>
        </Dialog>
        {/* Loan repayment Dialog End */}

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
