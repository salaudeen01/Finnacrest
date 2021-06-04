import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button,Typography, IconButton, CircularProgress, Toolbar, AppBar, Dialog, Hidden, Icon, Fab, MenuItem, TextField, Checkbox, Slide, Stepper, Step, StepLabel} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { Breadcrumb } from "matx";
import AccountProfile from './components/AccountProfile';
import AccountDetails from './components/AccountDetails';
import {getConfig, numberFormat, payID, setLastUrl} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import swal from 'sweetalert'
import Loading from "matx/components/MatxLoading/MatxLoading";
import {Link} from "react-router-dom"
import RemoveCard from 'app/views/dashboard/shared/RemoveCard';
import PayOption from 'app/views/dashboard/shared/PayOption';
import AddCardDialog from 'app/views/dashboard/shared/AddCardDialog';
import PersonalProfile from './components/PersonalProfile';
import NextOfKin from './components/NextOfKin';
import BusinessProfile from './components/BusinessProfile';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Setting2 extends Component{
constructor(props){
  super(props)
  setLastUrl()
  let email = localStorage.getItem('email');
  let image = localStorage.getItem('profile_pic');
  var currentDate = new Date();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
  this.state ={
    editPassword:false,
    editBankDetails:false,
    withdrawFund:false,
    profile:{
      first_name:"",
      last_name:"",
      address:"",
      phone_no:"",
      email:"",
      kin_last_name:"",
      kin_first_name:"",
      kin_phone_no:"",
      kin_email:"",
      relationship:"",
      profile_pic:image
    },
    add_card: {
      amount: 100,
      date_time: entry_date,
      payment_method: "Debit Card",
      paystack_id: "",
      save_card:true,
      card_id:"0",
  },
    password_data:{
      old_password:"",
      new_password:"",
      password_confirmation:""
    },
    withdraw_data:{
      amount: "",
      entry_date: entry_date,
      payment_method: "paystack",
      paystack_id: payID()
    },
    bank_data:[],
    banks: [],
    cards:[],
    bank_code:'',
    completeness:25,
    loading:true,
    isFetching:true,
    isChecking:false,
    data_checker:false,
    showSave:false,
    activeStep:0,
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  this.handleSubmitBankDetails = this.handleSubmitBankDetails.bind(this);
  this.handleChangePassword = this.handleChangePassword.bind(this);
  this.handleChangeBankDetails = this.handleChangeBankDetails.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleChangeCard = this.handleChangeCard.bind(this);
  this.showEditPassword = this.showEditPassword.bind(this);
  this.showEditBankDetails = this.showEditBankDetails.bind(this);
  this.showWithdraw = this.showWithdraw.bind(this);
  this.closeEditPassword = this.closeEditPassword.bind(this);
  this.closeEditBankDetails = this.closeEditBankDetails.bind(this);
  this.closeWithdraw = this.closeWithdraw.bind(this);
  this.check = this.check.bind(this);
  this.fetchBankDetails = this.fetchBankDetails.bind(this);
  this.handleQuickSave = this.handleQuickSave.bind(this);
  this.handleClose = this.handleClose.bind(this);
  this.callback = this.callback.bind(this);
  // this.removeCard = this.removeCard.bind(this);
}

callback = (response) => {
  const { add_card } = this.state;
    if (add_card.amount ) {
      this.setState({add_card:{...add_card, paystack_id: response.reference }})
  }
}
componentDidUpdate(){
  const { add_card } = this.state;
  if (add_card.paystack_id !== "") {
    this.props.saveWallet(add_card);
    this.setState({add_card:{...add_card, paystack_id:""}})
  }
}

componentDidMount(){
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getAllDebitCards'), requestOptions).then(async response => {
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
    }).catch(error => {
      if (error === "Unauthorized") {
        this.props.timeOut()
        }
    });
      fetch(getConfig('showProfile'), requestOptions).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
        if(data.success == false || data.length == 0){
          this.setState({profile: [], isFetching:false})
        }else{
          this.setState({profile: data[0]})
          if(data.length != 0 && data[0].relationship != ""){
            this.setState({completeness: 50}, 
            ()=>fetch(getConfig('getBank'), requestOptions).then(async res=>{
              const dat = await res.json();
              if (!res.ok) {
                const error = (dat && dat.message) || res.statusText;
                return Promise.reject(error);
              }
              if(data[0].profile_pic){
                this.setState({completeness: this.state.completeness+25})
              }
              if(dat.status == false || dat.length == 0){
                this.setState({isFetching:false, bank_data: []})
              }else{
                this.setState({isFetching:false, bank_data: dat[0], completeness: this.state.completeness+25})
              }
            }).catch(err=>{
                if (err === "Unauthorized") {
                  this.props.timeOut()
                }
            })
          )
      }else{
        fetch(getConfig('getBank'), requestOptions).then(async res=>{
            const dat = await res.json();
            if (!res.ok) {
              const error = (dat && dat.message) || res.statusText;
              return Promise.reject(error);
            }
            if(data[0].profile_pic){
              this.setState({completeness: this.state.completeness+25})
            }
            if(dat.success == false || dat.length == 0){
              this.setState({isFetching:false, bank_data: []})
            }else{
              this.setState({isFetching:false, bank_data: dat[0], completeness: this.state.completeness+25})
            }
          }).catch(err=>{
              if (err === "Unauthorized") {
                this.props.timeOut()
              }
          })
        }
      }
    }).catch(error => {
       if (error === "Unauthorized") {
        this.props.timeOut()
       }
       this.setState({isFetching:false})
    });
}

fetchBankDetails=()=>{
  const requestOptions = {
    method: 'GET',
    headers: { 'authorization': 'Bearer sk_live_2972a846b2b8c7096a62cf2a19b3675fe57455a9', 'Content-Type': 'application/json' },
  };
  fetch('https://api.paystack.co/bank', requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      this.setState({ loading: false})
      return Promise.reject(error);
    }
    this.setState({banks: data.data})
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.timeOut()
    }
  });
  const requestOpt={
    method: 'GET',
    headers: { ...authHeader, 'Content-Type': 'application/json' },
    }
    fetch(getConfig('getBank'), requestOpt).then(async res=>{
      const dat = await res.json();
      if (!res.ok) {
        const error = (dat && dat.message) || res.statusText;
        return Promise.reject(error);
      }
      if(dat.success == false || dat.length == 0){
        this.setState({bank_data: [], loading: false, data_checker:false})
      }else{
        this.setState({bank_data: dat[0], loading: false, data_checker:true})
      }
    }).catch(err=>{
        if (err === "Unauthorized") {
          this.props.timeOut()
        }
      })
}

check = (e)=>{
  const {name, value} = e.target
  const { bank_data, bank_code } = this.state;
  this.setState({ bank_data:{ ...bank_data, [name]:value }, isChecking:true })
  if(e.target.value.length == 10){
    const requestOptions = { 
      method: 'GET',
      headers: { 'authorization': 'Bearer sk_live_2972a846b2b8c7096a62cf2a19b3675fe57455a9', 'Content-Type': 'application/json' },
  };
    fetch('https://api.paystack.co/bank/resolve?account_number='+value+'&bank_code='+bank_code, requestOptions)
      .then(async response => {
      const res = await response.json();
      if (!response.ok) {
          const error = (bank_data && res.message) || response.statusText;
          return Promise.reject(error);
      }
      this.setState({
        bank_data:{
          ...bank_data, 
          account_no:res.data.account_number, 
          account_name:res.data.account_name, 
          bank_code: bank_code},
        isChecking:false
      })
    })
    .catch(error => {
      this.setState({isChecking:false})
      swal(
        `${"Invalid account, please check the account details and try again"}`
      );
    });
  }
}

handleClose() {
  this.setState({showSave:false});
}

handleQuickSave = () => {
  this.setState({showSave: true});
}


handleChangeCard(event) {
  const { name, value, checked } = event.target;
  const { add_card } = this.state;
  if(name == "save_card"){
    this.setState({add_card:{...add_card, [name]:checked}})
  }else{
    this.setState({add_card: {...add_card, [name]: value }});
  }
}

handleSubmit=()=> {
  const {profile} = this.state
  if(profile.length != 0){
      this.props.updateProfile(profile); 
  }else{
      swal(
          `${"All fields are required"}`
      );
  }   
}
handleSubmitBankDetails(event) {
  event.preventDefault();
  const { bank_data, data_checker } = this.state;
  // if (data_checker) {
  //     this.props.updateBank(bank_data);
  // }else{
      this.props.saveBank(bank_data);
  // }
}
handleSubmitPassword(event) {
  event.preventDefault();
  const { password_data } = this.state;
  if (password_data.old_password && password_data.new_password && password_data.password_confirmation) {
    if(password_data.new_password == password_data.password_confirmation){
      this.props.resetpassword(password_data);
    }else{
      swal(
        `Password Not Match`
      );
    }
  }else{
    swal(
        `${"All fields are required"}`
    );
}
}
handleChange = event => {
  const {profile} = this.state
  this.setState({ profile:{...profile, [event.target.name]: event.target.value} });
};
handleChangePassword = event => {
  const {password_data} = this.state
  this.setState({ password_data:{...password_data, [event.target.name]: event.target.value} });
};
handleChangeBankDetails(event) {
  event.preventDefault();
  const { name, value } = event.target;
  const { bank_data, banks} = this.state;
    this.setState({
      bank_data: {
        ...bank_data,
        [name]: banks[value].name,
        account_no:"",
        account_name:""
      },
      bank_code: banks[value].code,
      disabled:false
    }) 
}
showEditPassword=()=>{
  this.setState({editPassword:true})
}
showEditBankDetails=()=>{
  this.setState({loading:true})
  this.fetchBankDetails()
  this.setState({editBankDetails:true})
}
showWithdraw=()=>{
  this.setState({withdrawFund:true})
}
closeEditPassword=()=>{
  this.setState({editPassword:false})
}
closeEditBankDetails=()=>{
  this.setState({editBankDetails:false})
}
closeWithdraw=()=>{
  this.setState({withdrawFund:false})
}

handleNext = () => {
  this.setState({activeStep: this.state.activeStep + 1})
};

handleBack = () => {
  this.setState({activeStep: this.state.activeStep - 1})
};

handleReset = () => {
  this.setState({activeStep: 0})
};

getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <PersonalProfile 
      savings={this.props.savings}
      profile={this.state.profile}
      handleChange={this.handleChange} 
      handleSubmit={this.handleSubmit}/>;
    case 1:
      return <NextOfKin 
      savings={this.props.savings}
      profile={this.state.profile}
      handleChange={this.handleChange} 
      handleSubmit={this.handleSubmit}/>;
    case 2:
      return <BusinessProfile 
      savings={this.props.savings}
      profile={this.state.profile}
      handleChange={this.handleChange} 
      handleSubmit={this.handleSubmit}/>;
    default:
      return 'Unknown stepIndex';
  }
}
render(){
    const {theme} = this.props
    const steps = ['Personnal Profile', 'Next Of Kin Details', 'Business Profile'];
    const {profile, editPassword, cards, activeStep, isChecking, editBankDetails, showSave, add_card, withdrawFund, completeness, isFetching, withdraw_data, password_data, bank_data, banks, loading} = this.state
    return (
      <div className="m-sm-30">        
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              {/* <Typography >All steps completed</Typography>
              <Button onClick={this.handleReset}>Update</Button> */}
              {this.props.savings && (
            <img
              img
              alt=''
              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
            />
          )}
           <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
          <Button
            color='primary'
            variant='contained'
            style={{ color: "#fff" }}
            onClick={this.handleSubmit}
          >
            Update Profile
          </Button>
            </div>
          ) : (
            <div>
              {this.getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" className='text-white' onClick={this.handleNext} >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>

       
      </div>
    );
  };
  
  }
const actionCreators = {
  timeOut: userActions.timeOut,
  updatePicture: userActions.updatePicture,
  updateProfile: userActions.updateProfile,
  resetpassword: userActions.resetpassword,
  saveBank: userActions.saveBank,
  updateBank: userActions.updateBank,
  removeCard: userActions.removeCard,
  saveWallet: userActions.saveWallet,
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Setting2))
);