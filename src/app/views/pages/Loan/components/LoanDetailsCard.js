import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import TableCard from './TableCard';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userActions } from "../../../../redux/actions/user.actions";
import swal from 'sweetalert'

class LoanDetailsCard extends Component {
  constructor(props){
    super(props)
    this.resend_notif = this.resend_notif.bind(this);

  }


resend_notif = (group_id, loan_id)=>{
  swal({
    title: "Are you sure?",
    text: " you will not be able to reverse your action!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
    this.props.resendLoanNotification(group_id, loan_id);
      if(this.props.savings){
        swal("Loading...")
      }
    }
  })
  
}
  render(){
    return (
      <>
      {/* <div className="pt-2 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
       {this.props.loan_details.map((data, index) => (
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">{data.group_name} </Typography> <div className="py-2"/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Amount: {numberFormat(data.loan_amount)}</Typography><div className="py-2"/>
          <Typography variant="p" color="text-secondary font-bold"> Amount Repaid: {numberFormat(data.repaid)}</Typography><div className="py-2"/>
          <Typography variant="p" color="text-secondary font-bold"> Repayment Start Date: {(data.start_date)}</Typography><div className="py-2"/>
          <Typography variant="p" color="text-secondary font-bold"> Repayment End Date: {(data.end_date)}</Typography><div className="py-2"/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Status: <span style={{color:"green", padding:3, borderRadius:5}}>
             {data.loan_status == 0? "Pending":data.loan_status == 1?"Active":data.loan_status == 2?"Processing"
             :data.loan_status == 3? "Completed":data.loan_status == 9? "Cancel":data.loan_status == 3? "Completed":""}</span> </Typography>
        </Grid>
       ))}
      </Grid><div className="py-2"/>
    </div> */}
      <Typography variant="h6" className="text-green" >Guarantors Details</Typography>
      {this.props.data.length == 0 ?
      <Typography variant="subtitle" className="font-bold text-green" >Sorry You Currently Do Not Have any Standing Loan</Typography>:
      this.props.data.map((dat, index) => (
        <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
        <Grid container spacing={2} >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6"> {dat.last_name + " " + dat.first_name} </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="subtitle" color="text-secondary" className="font-medium">Guaranteed Amount</Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="subtitle" color="text-secondary" className="font-medium">{numberFormat(dat.guaranteed_amount)} </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="subtitle" color="text-secondary" className="font-medium">Status </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Typography variant="subtitle" className={dat.status==0? "text-gray":dat.status==1?"text-green":"text-error"}> {dat.status !=1? "Pending":"Active"} </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            {dat.status!=1? 
            <Button onClick={()=>this.resend_notif(dat.loan_group, dat.user_id)} variant="contained">Resend Notification</Button>: 
            <Button variant="outlined">Done</Button>}
          </Grid>
        </Grid>
      </div>
      ))}
      <div className="py-2" />
      <Divider variant="middle" />
      <div className="py-2" />
      <Typography variant="h6" className="font-bold text-green">Repayment Transactions </Typography>
      <TableCard details={this.props.approvals} />
      </>
    );
  }
}
const actionCreators = {
  logout: userActions.logout,
  resendLoanNotification: userActions.resendLoanNotification
};
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(LoanDetailsCard))
);