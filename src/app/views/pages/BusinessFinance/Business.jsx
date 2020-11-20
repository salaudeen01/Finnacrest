import { Breadcrumb, SimpleCard } from "matx";
import React,{Component} from "react";
import {Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Typography, Grid, AppBar, Dialog, IconButton, Toolbar, Card, Avatar, List, ListItemAvatar, ListItem, MenuItem, TextField, ListItemText, Checkbox, DialogActions } from "@material-ui/core";
import ExitToApp from '@material-ui/icons/ExitToApp';
import DoneAll from '@material-ui/icons/DoneAll';
import CloseIcon from "@material-ui/icons/Close";
import {getConfig, setLastUrl, numberFormat, checkLastUrl, checkUserStatus} from '../../../config/config'
import {authHeader} from '../../../redux/logic'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../redux/actions/user.actions";
import { withStyles } from "@material-ui/styles";
import BusinessTop from "./components/BusinessTop";
import BusinessCustomTab from "./components/BusinessCustomTab";

class Business extends Component {
  constructor(props){
    super(props)
    setLastUrl()
    
    let user = JSON.parse(localStorage.getItem("user"));
    let token = localStorage.getItem('token');
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    // let rand_id =this.getRand()
    this.state={
      requested_business:0
    }

    const requestOptions = {
      method: "GET",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    // let user = JSON.parse(localStorage.getItem("user"));
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
      if(d.request_status == 0){
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
}
    

render(){
  const{requested_business} = this.state
   return (
    <div className="m-sm-30">
        <BusinessTop />
        <BusinessCustomTab  tdetails={requested_business}/>
     
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
  withRouter(connect(mapState,  actionCreators)(Business))
);