import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Grid, Card, Button,Typography, IconButton, CircularProgress, Toolbar, AppBar, Dialog, Hidden, Icon, Fab, MenuItem, TextField, Checkbox, Slide} from '@material-ui/core';
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
import Settings2 from './Settings2';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class Settings extends Component{
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
    updateProfile:false,
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
  }
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleSubmitPassword = this.handleSubmitPassword.bind(this);
  this.handleSubmitBankDetails = this.handleSubmitBankDetails.bind(this);
  this.handleChangePassword = this.handleChangePassword.bind(this);
  this.handleChangeBankDetails = this.handleChangeBankDetails.bind(this);
  this.handleChange = this.handleChange.bind(this);
  this.handleChangeCard = this.handleChangeCard.bind(this);
  this.showEditPassword = this.showEditPassword.bind(this);
  this.showUpdateProfile = this.showUpdateProfile.bind(this);
  this.showEditBankDetails = this.showEditBankDetails.bind(this);
  this.showWithdraw = this.showWithdraw.bind(this);
  this.closeUpdateProfile = this.closeUpdateProfile.bind(this);
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
    // headers: { 'authorization': 'Bearer sk_live_2972a846b2b8c7096a62cf2a19b3675fe57455a9', 'Content-Type': 'application/json' },
    headers: { 'authorization': 'Bearer sk_test_629b392e2345d122b5941f00b27cdd91957ca848', 'Content-Type': 'application/json' },
    // sk_test_629b392e2345d122b5941f00b27cdd91957ca848',
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
      //headers: { 'authorization': 'Bearer sk_live_2972a846b2b8c7096a62cf2a19b3675fe57455a9', 'Content-Type': 'application/json' },
      headers: { 'authorization': 'Bearer sk_test_629b392e2345d122b5941f00b27cdd91957ca848', 'Content-Type': 'application/json' },
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
showUpdateProfile=()=>{
  this.setState({updateProfile:true})
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
closeUpdateProfile=()=>{
  this.setState({updateProfile:false})
}
closeEditBankDetails=()=>{
  this.setState({editBankDetails:false})
}
closeWithdraw=()=>{
  this.setState({withdrawFund:false})
}

render(){
    const {theme} = this.props
    const {profile, editPassword, updateProfile, cards, isChecking, editBankDetails, showSave, add_card, withdrawFund, completeness, isFetching, withdraw_data, password_data, bank_data, banks, loading} = this.state
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Settings" }
            ]}
          />
        </div>
        {isFetching ?
        <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <Loading />
        </div>:
        <div >
          <Grid container spacing={4} >    
            <Grid item lg={7} md={6} xl={7} xs={12} >
                <AccountProfile data={profile} completeness={completeness}/>
              </Grid>        
              <Grid item lg={4} md={6} xl={4} xs={12} >
              <Card onClick={this.showUpdateProfile} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} lg={6}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-primary box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>assignment_ind</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={12} md={6} xs={12}>
                    <div className="text-muted">
                      Update Profile
                    </div>
                  </Grid>
                </Grid>
              </Card>
              <div className="py-2" />
              <Card onClick={this.showEditPassword} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} lg={6}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-primary box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>https</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={12} md={6} xs={12}>
                    <div className="text-muted">
                      Change Password
                    </div>
                  </Grid>
                </Grid>
              </Card>
              <div className="py-2" />
              <Card onClick={this.showEditBankDetails} className="py-2 px-4 project-card">
                <Grid container alignItems="center">
                  <Grid item md={6} lg={6}>
                    <div className="flex items-center">
                      <Hidden smDown>
                          <Fab
                            className="ml-4 bg-primary box-shadow-none text-white"
                            size="small"
                          >
                            <Icon>payment</Icon>
                          </Fab>
                      </Hidden>
                    </div>
                  </Grid>
                  <Grid item lg={6} sm={12} md={6} xs={12}>
                    <div className="text-muted">
                      Add Bank Details
                    </div>
                  </Grid>
                </Grid>
              </Card>
              {/* <div className="py-2" />
              <Link to="/wallet">
                <Button
                color="secondary"
                variant="contained"
                style={{color:"#fff"}}
                type="submit">Go To Wallet</Button>
              </Link>
              <div className="py-2" /> */}
              <Typography variant="h6">My Cards</Typography>
              <RemoveCard cards={cards} open={this.handleQuickSave} date_time={add_card.date_time} saveWallet={this.props.saveWallet} removeCards={this.props.removeCard}/>
            </Grid>            
            <Grid  item lg={8} md={6} xl={8} xs={12} >
            </Grid>
          </Grid>
        </div>}

        <AddCardDialog callback={this.callback} showSave={showSave} handleClose={this.handleClose} add_card={add_card} handleChangeCard={this.handleChangeCard}/>

          
        {/* Change Password Dialog Start */}
        <Dialog 
        TransitionComponent={Transition}
        scroll='body'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
          open={updateProfile}
          onClose={this.closeUpdateProfile}>
          <AppBar color="primary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeUpdateProfile}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Update Profile
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            {/* <AccountDetails 
              savings={this.props.savings}
              profile={profile}
              handleChange={this.handleChange} 
              handleSubmit={this.handleSubmit}
            /> */}
            <Settings2/>
          </Card>
        </Dialog>
        {/* Change Password Dialog End */}

        {/* Change Password Dialog Start */}
        <Dialog 
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={editPassword}
          onClose={this.closeEditPassword}>
          <AppBar color="primary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeEditPassword}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Change Password
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
            <ValidatorForm
              ref="form"
              onSubmit={this.handleSubmitPassword}
              onError={errors => null}>
              <Grid container spacing={6}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextValidator
                      className="mb-4 w-full"
                      label="Enter Old Password"
                      onChange={this.handleChangePassword}
                      type="password"
                      name="old_password"
                      value={password_data.old_password}
                      validators={[ "required" ]}
                      errorMessages={["this field is required"]}
                    />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Enter New Password"
                    onChange={this.handleChangePassword}
                    type="password"
                    name="new_password"
                    value={password_data.new_password}
                    validators={[
                      "required"
                    ]}
                    errorMessages={["this field is required"]}
                  />
                  <TextValidator
                    className="mb-4 w-full"
                    label="Confirm New Password"
                    onChange={this.handleChangePassword}
                    type="password"
                    name="password_confirmation"
                    value={password_data.password_confirmation}
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
                    color="primary"
                    variant="contained"
                    style={{ color:"#fff"}}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          </Card>
        </Dialog>
        {/* Change Password Dialog End */}

        {/*Bank Details Dialog Start */}
        <Dialog 
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={editBankDetails}
          onClose={this.closeEditBankDetails}>
          <AppBar color="primary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeEditBankDetails}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" className="text-white" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Change Bank details
              </Typography>
            </Toolbar>
          </AppBar>   
            <Card className="px-6 pt-2 pb-4" style={{width:500}}>
              {loading ? 
              <Typography>Loading...</Typography>:
              <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmitBankDetails}
                onError={errors => null}>
                <Grid container spacing={0}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField
                      className="mb-4 w-full"
                      select
                      label={bank_data.bank_name? bank_data.bank_name: "Select Bank Name"}
                      name="bank_name"
                      onChange={this.handleChangeBankDetails}
                      SelectProps={{
                        native: true,
                      }}
                      variant="filled"
                      helperText="Please select Bank Name">
                      {banks.map((bank, index)=>(
                        <option  key={index} value={index}>{bank.name}</option >
                      ))}
                    </TextField>
                    <TextValidator
                      className="mb-4 w-full"
                      label="Account Number"
                      onChange={this.check}
                      variant="filled"
                      type="text"
                      name="account_no"
                      value={bank_data.account_no}
                      validators={[
                        "required"
                      ]}
                      errorMessages={["this field is required"]}
                    />
                    {isChecking && (
                      <CircularProgress
                        size={24}
                      />)}
                    <TextValidator
                      className="mb-4 w-full"
                      label="Account Name"
                      type="text"
                      variant="filled"
                      name="account_name"
                      value={bank_data.account_name}
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
                      style={{color:"#fff"}}>
                      Save 
                    </Button>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="subtitle1">{bank_data.bank_name}</Typography>
                    <Typography variant="subtitle1">{bank_data.account_name}</Typography>
                    <Typography variant="subtitle1">{bank_data.account_no}</Typography>
                  </Grid>
                </Grid>
              </ValidatorForm>}
            </Card>
        </Dialog>
        {/* Bank Details Dialog End */}

        {/* withdraw Dialog start */}
      <Dialog 
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
          open={withdrawFund}
          onClose={this.closeWithdraw}>
          <AppBar color="primary" style={{position: "relative"}}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.closeWithdraw}
                aria-label="Close"
              >
                <CloseIcon style={{color:'#fff'}}/>
              </IconButton>
              <Typography variant="h6" style={{marginLeft: theme.spacing(2), flex: 1, color:"#fff"}}>
                Withdraw To Bank Account
              </Typography>
            </Toolbar>
          </AppBar>
          <Card className="px-6 pt-2 pb-4">
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => null}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-4 w-full"
                  label="Enter Amount"
                  onChange={this.handleChange}
                  type="number"
                  name="amount"
                  value={withdraw_data.amount}
                  validators={[
                    "required"
                  ]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Card className="px-6 pt-2 pb-4">
                  <Typography variant="h6" gutterBottom>
                    {numberFormat(withdraw_data.amount)}
                  </Typography>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
                {bank_data.length == 0 ?
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    Please Go to settings to add Bank details
                  </Typography>
                </Grid>:
                <>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Bank Name:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.bank_name}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Name:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.account_name}
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                  Account Number:
                  </Typography>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Typography variant="subtitle1">
                    {bank_data.account_no}
                  </Typography>
                </Grid>
                </>}
            </Grid>
            
          </ValidatorForm>
          </Card>
        </Dialog>
        {/* withdraw dialog end */}
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
  withRouter(connect(mapState,  actionCreators)(Settings))
);