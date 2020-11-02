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
      <Typography variant="h6" className="text-primary" >Loan Guarantors</Typography>
      {this.props.data.length == 0 ?
      <Typography variant="subtitle" className="font-bold text-primary" >Sorry You Currently Do Not Have any Standing Loan</Typography>:
      this.props.data.map((dat, index) => (
        <div 
        key={index}
         className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#222943", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
        <Grid container spacing={2} >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6"> 
                {dat.last_name + " " + dat.first_name}
                {/* Tobiloba Adeio */}
             </Typography>
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
            <Typography variant="subtitle"
             className={dat.status==0? "text-gray":dat.status==1?"text-green":"text-error"}
             > 
             {dat.status !=1? "Pending":"Active"}
             {/* Pending */}
              </Typography>
          </Grid>         
        </Grid>
      </div>
       ))} 
      {/* <div className="py-2" />
      <Divider variant="middle" />
      <div className="py-2" />
      <Typography variant="h6" className="font-bold text-green">Loan Repayment Transactions </Typography>
      <TableCard details={this.props.approvals} /> */}
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