import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography, Grid, Box, ButtonGroup, Button} from '@material-ui/core';
import {numberFormat} from '../../../../config/config'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function LoanCards(props) {
  const classes = useStyles();
  const {data, view, manage, repayment, status} = props

  return (
    <div className="pt-7 mb-4 px-2 bg-default" style={{flexGrow: 1, border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20}}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Typography variant="h6">{data.group_name} </Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Amount: {numberFormat(data.loan_amount)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Amount Repaid: {numberFormat(data.repaid)}</Typography><br/>
          <Typography variant="p" color="text-secondary font-bold"> Loan Status: <span style={{backgroundColor: "green", color:"#fff", padding:3, borderRadius:5}}> {data.loan_status == 0? "Pending":data.loan_status == 1?"Processing":data.loan_status == 2?"Approved": "Completed"}</span> </Typography>
        </Grid>
        <div className="py-4" />
        
        <Grid item lg={12} md={12} sm={12} xs={12}>
        {status ?
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View</Button>
          {data.loan_status == 2 && <Button onClick={repayment}>Repay Loan</Button>}
        </ButtonGroup>:
        <ButtonGroup variant="outlined" color="primary" aria-label="text primary button group">
          <Button onClick={view}>View</Button>
        </ButtonGroup>}
        </Grid>
      </Grid>
    </div>
  );
}
