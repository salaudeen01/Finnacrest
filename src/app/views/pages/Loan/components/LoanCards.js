import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'
import { CancelOutlined } from '@material-ui/icons';

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
          <Typography variant="h6">{data.group_name} </Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Amount: {numberFormat(data.loan_amount)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Amount Repaid: {numberFormat(data.repaid)}</Typography><br/>
          {/* <Typography variant="p" color="text-secondary font-bold"> Repayment Start Date: {(data.start_date)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Repayment End Date: {(data.end_date)}</Typography><br/> */}
          <Typography variant="p" color="text-secondary font-bold"> Loan Status: <span style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:5}}>
             {data.loan_status == 1?"Active":data.loan_status == 2?"Processing":data.loan_status == 11?"Disbursed"
             :data.loan_status == 3? "Completed":data.loan_status == 9? "Cancelled":data.loan_status == 0? "Pending":""}</span> </Typography>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {(data.loan_status == 0 || data.loan_status == 2 || data.loan_status == 1) ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View Details</Button>
          <Button onClick={cancelLoan}>Cancel</Button>          
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
