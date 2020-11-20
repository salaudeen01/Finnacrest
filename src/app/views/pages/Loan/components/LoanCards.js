import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import { CancelOutlined } from '@material-ui/icons';
import dateFormat from "dateformat"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LoanCards(props) {
  const classes = useStyles();
  const {data, view, manage, repayment, status, cancelLoan} = props

  return (
    <div className="pt-2 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">{data.group_name} </Typography>
          <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Loan Amount: {numberFormat(data.loan_amount)}</Typography>
          <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Amount Repaid: {numberFormat(data.repaid)}</Typography>
          {/* <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Repayment Start Date: {(data.start_date)}</Typography>
          <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Repayment End Date: {(data.end_date)}</Typography> */}
          <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Loan Status: 
          {data.loan_status == 1?
          <span className="mb-4 py-1 px-2" style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> ACTIVE</span>
             :data.loan_status == 2?
             <span className="mb-4 py-1 px-2" style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> PROCESSING </span>
             :data.loan_status == 11?
             <span className="mb-4 py-1 px-2" style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> DISBURSED</span>
             :data.loan_status == 3?
             <span className="mb-4 py-1 px-2" style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> COMPLETED</span>
              :data.loan_status == 9?
            <span className="mb-4 py-1 px-2" style={{backgroundColor: "red", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> CANCELLED</span>
            :data.loan_status == 0?
            <span className="mb-4 py-1 px-2" style={{backgroundColor: "orange", color:"#fff", padding:3, borderRadius:14, fontSize:12,}}> PENDING</span>:""}
               </Typography>
          <Typography className="text-primary" variant="h6" style={{fontSize:16}}> Loan Due Date: {dateFormat(data.end_date, "mmmm dS, yyyy")}</Typography>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {(data.loan_status == 0 || data.loan_status == 2 || data.loan_status == 1) ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View Details</Button>
          <Button onClick={cancelLoan} variant="outlined" style={{borderColor:'red', color:'red'}}>Cancel</Button>          
        </ButtonGroup>:
        (data.loan_status == 11) ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View Details</Button>
          <Button onClick={repayment}>Repay Loan</Button>
        </ButtonGroup>:
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
        <Button onClick={view}>View Details</Button>
      </ButtonGroup>
        } 
        </Grid>
      </Grid>
    </div>
  );
}
