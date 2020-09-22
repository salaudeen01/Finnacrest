import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Divider, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
// import moment from 'moment';
export default function LoanGroupDetailsCard(props) {

  return (
    <>
    <Typography variant="h6" className="font-bold text-green" >Group Loans</Typography>
    {props.data.length == 0 ?
    <Typography variant="p" className="font-bold" >Sorry You Currently Do Not Have any Standing Loan</Typography>:
    props.data.map((dat, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2} >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6">Loan Collected By {dat.last_name + " " + dat.first_name}</Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Loan Amount: {numberFormat(dat.loan_amount)}</Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Amount Repaid: {numberFormat(dat.amount_repaid)} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium"> Guaranteed Amount: {numberFormat(dat.guaranteed_amount)} </Typography><br/>
          <Typography variant="subtitle" color="text-secondary" className="font-medium">Loan Due Date: {dat.loan_due_date} </Typography>
        </Grid>
      </Grid>
    </div>
    ))}
    <Divider variant="middle" />
    <Typography variant="h6" className="font-bold text-green">Group Members</Typography>
    {props.members.map((member, index) => (
      <div key={index} className="pt-4 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Typography variant="h6"> {member.name } </Typography><br/>
          <Typography variant="subtitle"> Email: {member.email} </Typography><br/>
          <Typography variant="subtitle"> Status <span className={member.status == 0?"text-gray":member.status == 1?"text-green":"text-error"}>{member.status == 0? "Pending":member.status == 1?"Approved":member.status == 2?"Rejected":"Exited"}</span> </Typography>
        </Grid>
      </Grid>
    </div>
    ))}
    </>
  );
}
